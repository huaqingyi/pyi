import { Context } from 'koa';
import { AppConfigOption } from './config';

export abstract class PYIBase {
    public static _pyi() {
        return {};
    }
    public static _baisc() {
        return PYIBase;
    }

    public ctx!: Context;
}

export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
