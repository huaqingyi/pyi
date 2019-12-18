import { Signale } from 'signale';
export interface PYIApp {
    [x: string]: any;
}
export declare type PYICoreClass<V> = (new (...args: any[]) => V & PYICore) & typeof PYICore;
export declare class PYICore implements PYIApp {
    [x: string]: any;
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYIApp;
    static _base(): PYIApp;
    static _extends(): any;
    static _pyiruntime(props: any): PYIApp;
    static _pyiconnect(props: any): PYIApp;
    protected static _this: PYIApp;
    mode: string;
    logger: Signale;
    constructor(...props: any);
}
