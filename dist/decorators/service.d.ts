import { PYICore } from '../core';
export declare abstract class PYIService extends PYICore {
    static _pyi: () => any;
    static _root(): typeof PYIService;
}
/**
 * 服务组件
 * @param target service component
 * @param key off
 */
export declare function Service(target: any & PYIService, key?: string): void;
