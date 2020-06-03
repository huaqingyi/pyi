import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
export declare class PYIService extends PYICore {
    static _base(): typeof PYIService;
    input(): this;
    output(): this;
}
/**
 * 服务组件
 * @param target service component
 * @param key off
 */
export declare function Service<V extends PYICoreClass<PYIService>>(target: V): V;
