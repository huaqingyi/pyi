import { Application } from './app.core';
import { Context } from 'koa';

export interface PYICoreApp {
    [x: string]: any;
}

export class PYICore implements PYICoreApp {
    public static __proto__: any;

    public static _pyi() {
        return {};
    }

    public static _root(): PYICoreApp {
        return PYICore;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _runtime() {
        return this;
    }

    public static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }

    protected static _this: PYICore;
    public mode!: string;
    public success!: (...args: any) => any;
    public debug!: (...args: any) => any;
    public pending!: (...args: any) => any;
    public fatal!: (...args: any) => any;
    public watch!: (...args: any) => any;
    public complete!: (...args: any) => any;
    public error!: (...args: any) => any;

    public app!: Application;
    private _dto!: boolean;

    public set dto(bool: boolean) {
        this._dto = bool;
        this.app.dto = this._dto;
    }

    public get dto() {
        return this.app.dto;
    }

    public get config() {
        return this.app.config;
    }

    protected get ctx(): Context {
        return this.app.ctx;
    }

    protected set ctx(ctx: Context) {
        this.app.ctx = ctx;
    }
}
