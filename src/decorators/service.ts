import { PYIBase } from '../core/pyi.base';

export abstract class PYIService extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIService;
    }

    constructor(...props: any) { super(); }
}

/**
 * 服务组件
 * @param target service component
 * @param key off
 */
// tslint:disable-next-line:no-empty
export function Service<UsePYIService = PYIService>(target: UsePYIService, key?: string) {

}
