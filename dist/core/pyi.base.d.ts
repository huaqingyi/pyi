import { Context } from 'koa';
import { AppConfigOption } from './config';
export declare abstract class PYIBase {
    static _pyi(): {};
    static _baisc(): typeof PYIBase;
    protected static _this: PYIBase;
    ctx: Context;
    constructor();
}
export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
