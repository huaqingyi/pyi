import { PYIAppConfiguration } from './configuration';
import { PYIApp, PYICoreClass, PYIPlugins } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { Compile } from '../core/compile';
import { Signale } from 'signale';
export interface PYIOnInit {
    onInit: () => any;
}
export interface PYIOnScanInit {
    onScanInit: () => any;
}
export interface PYIOnScanChange {
    onScanChange: () => any;
}
export interface PYIOnScanAfter {
    onScanAfter: () => any;
}
export interface PYIOnConfigurationInit {
    onConfigurationInit: () => any;
}
export interface PYIOnConfigurationAfter {
    onConfigurationAfter: (config: PYIAppConfiguration) => any;
}
export interface PYIOnInitApplication {
    onInitApplication: () => any;
}
export interface PYIOnPluginApplication {
    onPluginApplication: (plugins: PYICoreClass<PYIPlugins>) => any;
}
export declare type PYIApplicationClass<V> = (new (...args: any[]) => V & PYIApplication) & typeof PYIApplication;
export declare function PYIBootstrap<VC extends PYIApplicationClass<PYIApplication>>(tprops: VC): VC;
export declare function PYIBootstrap<Props = any>(props: Props & any): <VC extends PYIApplicationClass<PYIApplication>>(target: VC) => VC;
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
    compile: Compile;
    logger: Signale;
    private _bootstrap;
    private ready?;
    constructor();
    bootstrap(callback: () => any): Promise<unknown>;
    starter(): Promise<void>;
    private run;
}
