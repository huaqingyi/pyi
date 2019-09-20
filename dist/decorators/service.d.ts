import { PYIBase } from '../core/pyi.base';
export declare abstract class PYIService extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIService;
    constructor(...props: any);
}
/**
 * 服务组件
 * @param target service component
 * @param key off
 */
export declare function Service(target: PYIService, key?: string): void;
