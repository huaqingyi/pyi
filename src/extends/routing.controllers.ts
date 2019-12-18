// import { RoutingControllers as RRoutingControllers } from 'routing-controllers/RoutingControllers';
import { BaseDriver, ActionMetadata, Action, RoutingControllersOptions, InterceptorInterface } from 'routing-controllers';
import { ActionParameterHandler } from 'routing-controllers/ActionParameterHandler';
import { MetadataBuilder } from 'routing-controllers/metadata-builder/MetadataBuilder';
import { InterceptorMetadata } from 'routing-controllers/metadata/InterceptorMetadata';
import { isPromiseLike } from 'routing-controllers/util/isPromiseLike';
import { runInSequence } from 'routing-controllers/util/runInSequence';
import { importClassesFromDirectories } from 'routing-controllers/util/importClassesFromDirectories';
import { getFromContainer, ValidationOptions } from 'class-validator';
import { PYIThrows } from '../decorators/execption';
import { PYIDto } from '../decorators/dto';
import { PYICoreClass } from '../core/pyi';

export * from 'routing-controllers';

/**
 * Registers controllers and middlewares in the given server framework.
 */
export class RoutingControllers<T extends BaseDriver> {

    // -------------------------------------------------------------------------
    // Private properties
    // -------------------------------------------------------------------------

    /**
     * Used to check and handle controller action parameters.
     */
    private parameterHandler: ActionParameterHandler<T>;

    /**
     * Used to build metadata objects for controllers and middlewares.
     */
    private metadataBuilder: MetadataBuilder;

    /**
     * Global interceptors run on each controller action.
     */
    private interceptors: InterceptorMetadata[] = [];

    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------

    constructor(private driver: T, private options: RoutingControllersOptions) {
        this.parameterHandler = new ActionParameterHandler(driver);
        this.metadataBuilder = new MetadataBuilder(options);
    }

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Initializes the things driver needs before routes and middleware registration.
     */
    public initialize(): this {
        this.driver.initialize();
        return this;
    }

    /**
     * Registers all given interceptors.
     */
    public registerInterceptors(classes?: Function[]): this {
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
    public registerControllers(classes?: Function[]): this {
        const controllers = this.metadataBuilder.buildControllerMetadata(classes);
        controllers.forEach((controller) => {
            controller.actions.forEach((actionMetadata) => {
                const interceptorFns = this.prepareInterceptors([
                    ...this.interceptors,
                    ...actionMetadata.controllerMetadata.interceptors,
                    ...actionMetadata.interceptors
                ]);
                this.driver.registerAction(actionMetadata, (action: Action) => {
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
    public registerMiddlewares(type: 'before' | 'after', classes?: Function[]): this {
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
    protected executeAction(actionMetadata: ActionMetadata, action: Action, interceptorFns: Function[]) {

        // compute all parameters
        const paramsPromises = actionMetadata.params
            .sort((param1, param2) => param1.index - param2.index)
            .map((param) => this.parameterHandler.handle(action, param));

        const controllerInstance = actionMetadata.controllerMetadata.instance;
        const Dto = Reflect.getMetadata('design:returntype', controllerInstance, actionMetadata.method);

        // after all parameters are computed
        return Promise.all(paramsPromises).then(async (params) => {
            let body = {};
            let response: Promise<any> | PYICoreClass<PYIThrows<any>> | any;
            // execute action and handle result
            const allParams = actionMetadata.appendParams ? (
                actionMetadata.appendParams(action).concat(params)
            ) : params;
            if (actionMetadata.methodOverride) {
                response = actionMetadata.methodOverride(
                    actionMetadata, action, allParams
                );
            } else {
                response = await controllerInstance[actionMetadata.method].apply(controllerInstance, params);
            }
            if (
                response &&
                response._base &&
                response._base() === PYIThrows
            ) {
                const execption = new Proxy(new response(), {
                    get: (t, p) => {
                        if (t[p]) {
                            return t[p];
                        } else { return controllerInstance[p]; }
                    },
                    set: (t, p, value) => {
                        t[p] = value;
                        return true;
                    }
                });
                if (
                    Dto &&
                    Dto._base &&
                    Dto._base() === PYIDto
                ) {
                    try {
                        const data = await execption.throws();
                        body = (new Dto(data));
                    } catch (error) {
                        body = (new Dto(body)).throws(error);
                    }
                } else {
                    body = await execption.throws();
                }
            }
            return await this.handleCallMethodResult(body, actionMetadata, action, interceptorFns);

        }).catch(async (error) => {
            if (
                Dto &&
                Dto._base &&
                Dto._base() === PYIDto
            ) {
                const body = (new Dto({})).throws(error);
                return await this.handleCallMethodResult(body, actionMetadata, action, interceptorFns);
            } else {
                return this.driver.handleError(error, actionMetadata, action);
            }
            // otherwise simply handle error without action execution
            // return this.driver.handleError(error, actionMetadata, action);
        });
    }

    /**
     * Handles result of the action method execution.
     */
    protected handleCallMethodResult(
        result: any, action: ActionMetadata,
        options: Action, interceptorFns: Function[]
    ): any {
        if (isPromiseLike(result)) {
            return result
                .then((data: any) => {
                    return this.handleCallMethodResult(data, action, options, interceptorFns);
                })
                .catch((error: any) => {
                    return this.driver.handleError(error, action, options);
                });
        } else {

            if (interceptorFns) {
                const awaitPromise = runInSequence(interceptorFns, (interceptorFn) => {
                    const interceptedResult = interceptorFn(options, result);
                    if (isPromiseLike(interceptedResult)) {
                        return interceptedResult.then((resultFromPromise: any) => {
                            result = resultFromPromise;
                        });
                    } else {
                        result = interceptedResult;
                        return Promise.resolve();
                    }
                });

                return awaitPromise
                    .then(() => this.driver.handleSuccess(result, action, options))
                    .catch((error) => this.driver.handleError(error, action, options));
            } else {
                return this.driver.handleSuccess(result, action, options);
            }
        }
    }
    /**
     * Creates interceptors from the given 'use interceptors'.
     */
    protected prepareInterceptors(uses: InterceptorMetadata[]): Function[] {
        return uses.map((use) => {
            if (
                use.interceptor.prototype &&
                use.interceptor.prototype.intercept
            ) { // if this is function instance of InterceptorInterface
                return (action: Action, result: any) => {
                    return (getFromContainer(use.interceptor) as InterceptorInterface).intercept(action, result);
                };
            }
            return use.interceptor;
        });
    }
}

/**
 * Registers all loaded actions in your express application.
 */
export function createExecutor<T extends BaseDriver>(driver: T, options: RoutingControllersOptions = {}): void {

    // import all controllers and middlewares and error handlers (new way)
    let controllerClasses: Function[] = [];
    if (options && options.controllers && options.controllers.length) {
        controllerClasses = (options.controllers as any[]).filter((controller) => controller instanceof Function);
        const controllerDirs = (options.controllers as any[]).filter((controller) => typeof controller === 'string');
        controllerClasses.push(...importClassesFromDirectories(controllerDirs));
    }
    let middlewareClasses: Function[] = [];
    if (options && options.middlewares && options.middlewares.length) {
        middlewareClasses = (options.middlewares as any[]).filter((controller) => controller instanceof Function);
        const middlewareDirs = (options.middlewares as any[]).filter((controller) => typeof controller === 'string');
        middlewareClasses.push(...importClassesFromDirectories(middlewareDirs));
    }
    let interceptorClasses: Function[] = [];
    if (options && options.interceptors && options.interceptors.length) {
        interceptorClasses = (options.interceptors as any[]).filter((controller) => controller instanceof Function);
        const interceptorDirs = (options.interceptors as any[]).filter((controller) => typeof controller === 'string');
        interceptorClasses.push(...importClassesFromDirectories(interceptorDirs));
    }

    if (options && options.development !== undefined) {
        driver.developmentMode = options.development;
    } else {
        driver.developmentMode = process.env.NODE_ENV !== 'production';
    }

    if (options.defaultErrorHandler !== undefined) {
        driver.isDefaultErrorHandlingEnabled = options.defaultErrorHandler;
    } else {
        driver.isDefaultErrorHandlingEnabled = true;
    }

    if (options.classTransformer !== undefined) {
        driver.useClassTransformer = options.classTransformer;
    } else {
        driver.useClassTransformer = true;
    }

    if (options.validation !== undefined) {
        driver.enableValidation = !!options.validation;
        if (options.validation instanceof Object) {
            driver.validationOptions = options.validation as ValidationOptions;
        }

    } else {
        driver.enableValidation = true;
    }

    driver.classToPlainTransformOptions = options.classToPlainTransformOptions as any;
    driver.plainToClassTransformOptions = options.plainToClassTransformOptions as any;

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
