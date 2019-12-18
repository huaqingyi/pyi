import { PYICore, PYIApp, PYICoreClass } from '../core';
export * from '../extends';
/**
 * Controller ================================
 */
export declare enum RequestMappingMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    PATCH = "PATCH",
    CONNECT = "CONNECT",
    CHECKOUT = "CHECKOUT",
    COPY = "COPY",
    HEAD = "HEAD",
    LOCK = "LOCK",
    MERGE = "MERGE",
    MKACTIVITY = "MKACTIVITY",
    MKCOL = "MKCOL",
    MOVE = "MOVE",
    M_SEARCH = "m-search",
    NOTIFY = "NOTIFY",
    OPTIONS = "OPTIONS",
    PROPFIND = "PROPFIND",
    PROPPATCH = "PROPPATCH",
    PURGE = "PURGE",
    REPORT = "REPORT",
    SEARCH = "SEARCH",
    SUBSCRIBE = "SUBSCRIBE",
    TRACE = "TRACE",
    UNLOCK = "UNLOCK",
    UNSUBSCRIBE = "UNSUBSCRIBE"
}
export interface ControllerConfiguration {
    prefix?: string;
}
export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
}
export declare function Controller<VC extends PYICoreClass<PYIController>>(tprops: VC): VC;
export declare function Controller<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIController>>(target: VC) => VC;
export declare class PYIController<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
export declare function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any;
export interface PYIMiddlewareProps {
    type: 'after' | 'before';
    priority?: number;
}
export declare function Middleware<VC extends PYICoreClass<PYIMiddleware>>(tprops: VC): VC;
export declare function Middleware<Props = PYIMiddlewareProps>(props: Props & PYIMiddlewareProps): <VC extends PYICoreClass<PYIMiddleware>>(target: VC) => VC;
export declare class PYIMiddleware<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
export interface PYIInterceptorProps {
    priority?: number;
}
export declare function Interceptor<VC extends PYICoreClass<PYIInterceptor>>(tprops: VC): VC;
export declare function Interceptor<Props = PYIInterceptorProps>(props: Props & PYIInterceptorProps): <VC extends PYICoreClass<PYIInterceptor>>(target: VC) => VC;
export declare class PYIInterceptor<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
