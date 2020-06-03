import { PYICore, PYICoreClass } from '../core';
/**
 * Controller ================================
 */
export declare enum RequestMappingMethod {
    GET = "GET",
    POST = "POST",
    DELETE = "DELETE",
    PUT = "PUT",
    PATCH = "PATCH"
}
export interface ControllerConfiguration {
    prefix?: string;
    auto?: boolean;
}
export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
}
export declare class PYIController extends PYICore {
    static _base(): typeof PYIController;
    input(): this;
    output(): this;
}
/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export declare function Controller<V extends PYICoreClass<PYIController>>(target: V): V;
export declare function Controller(config: ControllerConfiguration): <V extends PYICoreClass<PYIController>>(target: V) => V;
export declare function RequestMapping(target: PYIController, method: string): TypedPropertyDescriptor<() => any>;
export declare function RequestMapping(config: ControllerRequestConfiguration): (target: PYIController, method: string) => TypedPropertyDescriptor<() => any>;
