import { PYICore, PYIApp } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { Signale } from 'signale';
import { PYIAppConfiguration } from '../decorators/configuration';

/**
 * 继承 Koa 主类
 */
export class PYIApplication<
    StateT = DefaultState,
    CustomT = DefaultContext
    > extends Koa<StateT, CustomT> {
    [x: string]: any;
    public static __proto__: any;

    public static _pyi() {
        return {};
    }

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base(): PYIApp {
        return PYIApplication;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _pyiruntime() {
        return this;
    }

    public static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }

    protected static _this: PYIApplication;
    public mode!: string;
    public props?: any;
    public config!: PYIAppConfiguration;
    // logger 插件
    public logger: Signale;

    constructor() {
        super();
        this.logger = new Signale();
    }

}
