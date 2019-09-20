export * from 'routing-controllers';
import { ActionType } from 'routing-controllers/metadata/types/ActionType';
import { PYIBase } from '../core/pyi.base';
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
}
export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | ActionType[];
}
export declare abstract class PYIController extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIController;
    constructor(...props: any);
}
/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export declare function Controller<Props = ControllerConfiguration | PYIController>(config: Props): any;
/**
 * Extends for routing-controllers ActionType
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export declare function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any;
/**
 * Middleware ===============================================
 */
export declare abstract class PYIMiddleware extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIMiddleware;
    constructor(...props: any);
}
/**
 * Extends for routing-controllers middleware
 * @param options extends routing-controllers middleware
 */
export declare function Middleware(options: {
    type: 'after' | 'before';
    priority?: number;
}): (target: any, key?: string | undefined) => void;
export declare abstract class PYIInterceptor extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIInterceptor;
    constructor(...props: any);
}
/**
 * Extends for routing-controllers Interceptor
 * @param options extends routing-controllers Interceptor
 */
export declare function Interceptor(options?: {
    priority?: number;
}): (target: any, key?: string | undefined) => void;
