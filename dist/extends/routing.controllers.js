"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const ActionParameterHandler_1 = require("routing-controllers/ActionParameterHandler");
const MetadataBuilder_1 = require("routing-controllers/metadata-builder/MetadataBuilder");
const isPromiseLike_1 = require("routing-controllers/util/isPromiseLike");
const runInSequence_1 = require("routing-controllers/util/runInSequence");
const importClassesFromDirectories_1 = require("routing-controllers/util/importClassesFromDirectories");
const class_validator_1 = require("class-validator");
const execption_1 = require("../decorators/execption");
const dto_1 = require("../decorators/dto");
__export(require("routing-controllers"));
/**
 * Registers controllers and middlewares in the given server framework.
 */
class RoutingControllers {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    constructor(driver, options) {
        this.driver = driver;
        this.options = options;
        /**
         * Global interceptors run on each controller action.
         */
        this.interceptors = [];
        this.parameterHandler = new ActionParameterHandler_1.ActionParameterHandler(driver);
        this.metadataBuilder = new MetadataBuilder_1.MetadataBuilder(options);
    }
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    /**
     * Initializes the things driver needs before routes and middleware registration.
     */
    initialize() {
        this.driver.initialize();
        return this;
    }
    /**
     * Registers all given interceptors.
     */
    registerInterceptors(classes) {
        const interceptors = this.metadataBuilder
            .buildInterceptorMetadata(classes)
            .sort((middleware1, middleware2) => middleware1.priority - middleware2.priority)
            .reverse();
        this.interceptors.push(...interceptors);
        return this;
    }
    /**
     * Registers all given controllers and actions from those controllers.
     */
    registerControllers(classes) {
        const controllers = this.metadataBuilder.buildControllerMetadata(classes);
        controllers.forEach((controller) => {
            controller.actions.forEach((actionMetadata) => {
                const interceptorFns = this.prepareInterceptors([
                    ...this.interceptors,
                    ...actionMetadata.controllerMetadata.interceptors,
                    ...actionMetadata.interceptors
                ]);
                this.driver.registerAction(actionMetadata, (action) => {
                    return this.executeAction(actionMetadata, action, interceptorFns);
                });
            });
        });
        this.driver.registerRoutes();
        return this;
    }
    /**
     * Registers post-execution middlewares in the driver.
     */
    registerMiddlewares(type, classes) {
        this.metadataBuilder
            .buildMiddlewareMetadata(classes)
            .filter((middleware) => middleware.global && middleware.type === type)
            .sort((middleware1, middleware2) => middleware2.priority - middleware1.priority)
            .forEach((middleware) => this.driver.registerMiddleware(middleware));
        return this;
    }
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    /**
     * Executes given controller action.
     */
    executeAction(actionMetadata, action, interceptorFns) {
        // compute all parameters
        const paramsPromises = actionMetadata.params
            .sort((param1, param2) => param1.index - param2.index)
            .map((param) => this.parameterHandler.handle(action, param));
        const controllerInstance = actionMetadata.controllerMetadata.instance;
        const Dto = Reflect.getMetadata('design:returntype', controllerInstance, actionMetadata.method);
        // after all parameters are computed
        return Promise.all(paramsPromises).then(async (params) => {
            let body = {};
            let response;
            // execute action and handle result
            const allParams = actionMetadata.appendParams ? (actionMetadata.appendParams(action).concat(params)) : params;
            if (actionMetadata.methodOverride) {
                response = actionMetadata.methodOverride(actionMetadata, action, allParams);
            }
            else {
                response = await controllerInstance[actionMetadata.method].apply(controllerInstance, params);
            }
            if (response &&
                response._base &&
                response._base() === execption_1.PYIThrows) {
                const execption = new Proxy(new response(), {
                    get: (t, p) => {
                        if (t[p]) {
                            return t[p];
                        }
                        else {
                            return controllerInstance[p];
                        }
                    },
                    set: (t, p, value) => {
                        t[p] = value;
                        return true;
                    }
                });
                if (Dto &&
                    Dto._base &&
                    Dto._base() === dto_1.PYIDto) {
                    try {
                        const data = await execption.throws();
                        body = (new Dto(data));
                    }
                    catch (error) {
                        body = (new Dto(body)).throws(error);
                    }
                }
                else {
                    body = await execption.throws();
                }
            }
            return await this.handleCallMethodResult(body, actionMetadata, action, interceptorFns);
        }).catch(async (error) => {
            if (Dto &&
                Dto._base &&
                Dto._base() === dto_1.PYIDto) {
                const body = (new Dto({})).throws(error);
                return await this.handleCallMethodResult(body, actionMetadata, action, interceptorFns);
            }
            else {
                return this.driver.handleError(error, actionMetadata, action);
            }
            // otherwise simply handle error without action execution
            // return this.driver.handleError(error, actionMetadata, action);
        });
    }
    /**
     * Handles result of the action method execution.
     */
    handleCallMethodResult(result, action, options, interceptorFns) {
        if (isPromiseLike_1.isPromiseLike(result)) {
            return result
                .then((data) => {
                return this.handleCallMethodResult(data, action, options, interceptorFns);
            })
                .catch((error) => {
                return this.driver.handleError(error, action, options);
            });
        }
        else {
            if (interceptorFns) {
                const awaitPromise = runInSequence_1.runInSequence(interceptorFns, (interceptorFn) => {
                    const interceptedResult = interceptorFn(options, result);
                    if (isPromiseLike_1.isPromiseLike(interceptedResult)) {
                        return interceptedResult.then((resultFromPromise) => {
                            result = resultFromPromise;
                        });
                    }
                    else {
                        result = interceptedResult;
                        return Promise.resolve();
                    }
                });
                return awaitPromise
                    .then(() => this.driver.handleSuccess(result, action, options))
                    .catch((error) => this.driver.handleError(error, action, options));
            }
            else {
                return this.driver.handleSuccess(result, action, options);
            }
        }
    }
    /**
     * Creates interceptors from the given 'use interceptors'.
     */
    prepareInterceptors(uses) {
        return uses.map((use) => {
            if (use.interceptor.prototype &&
                use.interceptor.prototype.intercept) { // if this is function instance of InterceptorInterface
                return (action, result) => {
                    return class_validator_1.getFromContainer(use.interceptor).intercept(action, result);
                };
            }
            return use.interceptor;
        });
    }
}
exports.RoutingControllers = RoutingControllers;
/**
 * Registers all loaded actions in your express application.
 */
function createExecutor(driver, options = {}) {
    // import all controllers and middlewares and error handlers (new way)
    let controllerClasses = [];
    if (options && options.controllers && options.controllers.length) {
        controllerClasses = options.controllers.filter((controller) => controller instanceof Function);
        const controllerDirs = options.controllers.filter((controller) => typeof controller === 'string');
        controllerClasses.push(...importClassesFromDirectories_1.importClassesFromDirectories(controllerDirs));
    }
    let middlewareClasses = [];
    if (options && options.middlewares && options.middlewares.length) {
        middlewareClasses = options.middlewares.filter((controller) => controller instanceof Function);
        const middlewareDirs = options.middlewares.filter((controller) => typeof controller === 'string');
        middlewareClasses.push(...importClassesFromDirectories_1.importClassesFromDirectories(middlewareDirs));
    }
    let interceptorClasses = [];
    if (options && options.interceptors && options.interceptors.length) {
        interceptorClasses = options.interceptors.filter((controller) => controller instanceof Function);
        const interceptorDirs = options.interceptors.filter((controller) => typeof controller === 'string');
        interceptorClasses.push(...importClassesFromDirectories_1.importClassesFromDirectories(interceptorDirs));
    }
    if (options && options.development !== undefined) {
        driver.developmentMode = options.development;
    }
    else {
        driver.developmentMode = process.env.NODE_ENV !== 'production';
    }
    if (options.defaultErrorHandler !== undefined) {
        driver.isDefaultErrorHandlingEnabled = options.defaultErrorHandler;
    }
    else {
        driver.isDefaultErrorHandlingEnabled = true;
    }
    if (options.classTransformer !== undefined) {
        driver.useClassTransformer = options.classTransformer;
    }
    else {
        driver.useClassTransformer = true;
    }
    if (options.validation !== undefined) {
        driver.enableValidation = !!options.validation;
        if (options.validation instanceof Object) {
            driver.validationOptions = options.validation;
        }
    }
    else {
        driver.enableValidation = true;
    }
    driver.classToPlainTransformOptions = options.classToPlainTransformOptions;
    driver.plainToClassTransformOptions = options.plainToClassTransformOptions;
    if (options.errorOverridingMap !== undefined) {
        driver.errorOverridingMap = options.errorOverridingMap;
    }
    if (options.routePrefix !== undefined) {
        driver.routePrefix = options.routePrefix;
    }
    if (options.currentUserChecker !== undefined) {
        driver.currentUserChecker = options.currentUserChecker;
    }
    if (options.authorizationChecker !== undefined) {
        driver.authorizationChecker = options.authorizationChecker;
    }
    driver.cors = options.cors;
    // next create a controller executor
    new RoutingControllers(driver, options)
        .initialize()
        .registerInterceptors(interceptorClasses)
        .registerMiddlewares('before', middlewareClasses)
        .registerControllers(controllerClasses)
        .registerMiddlewares('after', middlewareClasses); // todo: register only for loaded controllers?
}
exports.createExecutor = createExecutor;

//# sourceMappingURL=../sourcemaps/extends/routing.controllers.js.map
