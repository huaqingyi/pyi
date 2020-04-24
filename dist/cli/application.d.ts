import { PYIApp } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { Signale } from 'signale';
import { PYIAppConfiguration } from '../decorators/configuration';
/**
 * 继承 Koa 主类
 */
export declare class PYIApplication<StateT = DefaultState, CustomT = DefaultContext> extends Koa<StateT, CustomT> {
    [x: string]: any;
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYIApp;
    static _base(): PYIApp;
    static _extends(): any;
    static _pyiruntime(): typeof PYIApplication;
    static _connect(): PYIApplication<Koa.DefaultState, Koa.DefaultContext>;
    protected static _this: PYIApplication;
    mode: string;
    props?: any;
    config: PYIAppConfiguration;
    logger: Signale;
    constructor();
}
