import { Context } from 'koa';
import { AppConfigOption } from './config';
import { PYIVo } from '../decorators';
export declare abstract class PYIBase {
    static _pyi(): {};
    static _baisc(): typeof PYIBase;
    static Execption<UseParentClass = any, UsePYIVo = PYIVo>(execption: UseParentClass & any, Vo?: UsePYIVo & any): any;
    protected static _this: PYIBase;
    ctx: Context;
    constructor();
}
export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
