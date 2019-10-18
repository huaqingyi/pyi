/// <reference types="koa-bodyparser" />
import Koa from 'koa';
import { PYICoreApp } from './pyi.core';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIAutoAppConfiguration } from '../decorators';
import { BehaviorSubject, Subscription } from 'rxjs';
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
    protected app: this;
    constructor();
    setup(app: Application, callback?: () => any): Promise<this>;
    starter(callback?: () => any): Subscription;
}
