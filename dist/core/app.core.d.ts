/// <reference types="koa-bodyparser" />
import Koa from 'koa';
import { PYICoreApp } from './pyi.core';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIAutoAppConfiguration } from '../decorators';
import { BehaviorSubject } from 'rxjs';
export declare class Application extends Koa implements PYICoreApp {
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYICoreApp;
    static _extends(): any;
    static _runtime(): typeof Application;
    static bootstrap(): Application;
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
    protected app: this;
    constructor();
    setup(app: Application, callback?: () => any): Promise<this>;
    starter(callback?: () => any): import("rxjs").Subscription;
}
