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
    app: Application;
    private _dto;
    dto: boolean;
}
