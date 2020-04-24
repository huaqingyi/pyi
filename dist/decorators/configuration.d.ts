import { PYICore, PYIApp, PYICoreClass } from '../core';
import { PYIController, PYIMiddleware, PYIInterceptor } from './controller';
import { ClassTransformOptions } from 'class-transformer';
import { ValidatorOptions } from 'class-validator';
import { AuthorizationChecker } from 'routing-controllers/AuthorizationChecker';
import { CurrentUserChecker } from 'routing-controllers/CurrentUserChecker';
import { SignaleOptions } from 'signale';
import { PYIPlugin } from './plugins';
import { SwaggerJSON } from '../libs/swagger';
import { PYIServlet } from '../libs/jwt/jwt.auth.servlet';
export declare function Configuration<VC extends PYICoreClass<PYIConfiguration>>(tprops: VC): VC;
export declare function Configuration<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIConfiguration>>(target: VC) => VC;
export interface AppSwaggerJSON extends SwaggerJSON {
    path: string;
}
export declare class PYIConfiguration<Props = any> extends PYICore {
    [x: string]: any;
    static _base(): PYIApp;
    props: Props;
    _pyiruntime(): any;
}
export interface PYIRoutingConfiguration {
    /**
     * Indicates if cors are enabled.
     * This requires installation of additional module (cors for express and kcors for koa).
     */
    cors?: boolean | Object;
    /**
     * Global route prefix, for example '/api'.
     */
    routePrefix?: string;
    /**
     * List of controllers to register in the framework or directories from where to import all your controllers.
     */
    controllers: Array<PYICoreClass<PYIController>> | string[];
    /**
     * List of middlewares to register in the framework or directories from where to import all your middlewares.
     */
    middlewares?: Array<PYICoreClass<PYIMiddleware>> | string[];
    /**
     * List of interceptors to register in the framework or directories from where to import all your interceptors.
     */
    interceptors?: Array<PYICoreClass<PYIInterceptor>> | string[];
    /**
     * Indicates if class-transformer should be used to perform serialization / deserialization.
     */
    classTransformer?: boolean;
    /**
     * Global class transformer options passed to class-transformer during classToPlain operation.
     * This operation is being executed when server returns response to user.
     */
    classToPlainTransformOptions?: ClassTransformOptions;
    /**
     * Global class transformer options passed to class-transformer during plainToClass operation.
     * This operation is being executed when parsing user parameters.
     */
    plainToClassTransformOptions?: ClassTransformOptions;
    /**
     * Indicates if class-validator should be used to auto validate objects injected into params.
     * You can also directly pass validator options to enable validator with a given options.
     */
    validation?: boolean | ValidatorOptions;
    /**
     * Indicates if default routing-controller's error handler is enabled or not.
     * Enabled by default.
     */
    defaultErrorHandler?: boolean;
    /**
     * Map of error overrides.
     */
    errorOverridingMap?: {
        [key: string]: any;
    };
    /**
     * Special function used to check user authorization roles per request.
     * Must return true or promise with boolean true resolved for authorization to succeed.
     */
    authorizationChecker?: AuthorizationChecker;
    /**
     * Special function used to get currently authorized user.
     */
    currentUserChecker?: CurrentUserChecker;
    /**
     * Default settings
     */
    defaults?: {
        /**
         * If set, all null responses will return specified status code by default
         */
        nullResultCode?: number;
        /**
         * If set, all undefined responses will return specified status code by default
         */
        undefinedResultCode?: number;
        /**
         * Default param options
         */
        paramOptions?: {
            /**
             * If true, all non-set parameters will be required by default
             */
            required?: boolean;
        };
    };
    debugOptions?: SignaleOptions;
    development?: () => any;
    production?: () => any;
    docs?: SwaggerJSON | false;
    jwt?: PYICoreClass<PYIServlet> | false;
    jwtSecretKey?: string;
    watch: boolean;
}
export declare class PYIAppConfiguration<Props = any> extends PYIConfiguration implements PYIRoutingConfiguration {
    static _base(): PYIApp;
    props: Props;
    controllers: Array<PYICoreClass<PYIController>>;
    middlewares: Array<PYICoreClass<PYIMiddleware>>;
    interceptors: Array<PYICoreClass<PYIInterceptor>>;
    plugins: Array<PYICoreClass<PYIPlugin>>;
    defaultErrorHandler: boolean;
    port: number;
    host: string;
    debugOptions?: SignaleOptions;
    docs: AppSwaggerJSON | false;
    jwt: PYICoreClass<PYIServlet> | false;
    jwtSecretKey: string;
    watch: boolean;
    constructor();
    _pyiruntime(): any;
}
