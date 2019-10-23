/// <reference types="koa-session" />
/// <reference types="koa-bodyparser" />
import Koa, { Context, Middleware } from 'koa';
import { PYICoreApp } from './pyi.core';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIAutoAppConfiguration } from '../decorators';
import { BehaviorSubject } from 'rxjs';
export declare class Application<StateT = Koa.DefaultState, CustomT = Koa.DefaultContext> extends Koa implements PYICoreApp {
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYICoreApp;
    static _extends(): any;
    static _runtime(): typeof Application;
    protected static _this: Application;
    [x: string]: any;
    controllers: PYIController[];
    middlewares: PYIMiddleware[];
    interceptors: PYIInterceptor[];
    components: PYIComponent[];
    config: PYIAutoAppConfiguration;
    mode: string;
    dto: boolean;
    _setup: BehaviorSubject<any>;
    success: (...args: any) => any;
    debug: (...args: any) => any;
    pending: (...args: any) => any;
    fatal: (...args: any) => any;
    watch: (...args: any) => any;
    complete: (...args: any) => any;
    error: (...args: any) => any;
    ctx: Context;
    protected app: this;
    constructor();
    use<NewStateT = any, NewCustomT = any>(middleware: Middleware<StateT & NewStateT, CustomT & NewCustomT>): any & Koa<StateT & NewStateT, CustomT & NewCustomT>;
    addUse(): Promise<this>;
    setup(app: Application, callback?: () => any): Promise<this>;
    starter(): Promise<void>;
    bootstrap(callback?: () => any): import("rxjs").Subscription;
}
