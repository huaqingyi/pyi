import { Context } from 'koa';
import { AppConfigOption } from './config';

export abstract class PYIBase {

    public static _pyi() {
        return {};
    }

    public static _baisc() {
        return PYIBase;
    }

    protected static _this: PYIBase;

    public ctx!: Context;

    constructor() {
        PYIBase._this = this;
    }
}

export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
