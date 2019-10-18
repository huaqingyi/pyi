import { Application } from './app.core';
export interface PYICoreApp {
    [x: string]: any;
}
export declare abstract class PYICore implements PYICoreApp {
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYICoreApp;
    static _extends(): any;
    static _runtime(): typeof PYICore;
    protected static _this: PYICore;
    mode: string;
    success: (...args: any) => any;
    debug: (...args: any) => any;
    pending: (...args: any) => any;
    fatal: (...args: any) => any;
    watch: (...args: any) => any;
    complete: (...args: any) => any;
    error: (...args: any) => any;
    app: Application;
    private _dto;
    dto: boolean;
}
