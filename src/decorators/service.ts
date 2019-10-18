import { PYICore } from '../core';

export abstract class PYIService extends PYICore {
    public static _pyi: () => any;
    public static _root() {
        return PYIService;
    }
}

/**
 * 服务组件
 * @param target service component
 * @param key off
 */
// tslint:disable-next-line:no-empty
export function Service(target: any & PYIService, key?: string) {

}
