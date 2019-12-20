import { PYIAppConfiguration } from './configuration';
import { PYIApp, PYICoreClass, PYIPlugins } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { Compile } from '../core/compile';
import { Signale } from 'signale';
/**
 * Application init
 */
export interface PYIOnInit {
    onInit: () => any;
}
/**
 * 开始扫描文件
 */
export interface PYIOnScanInit {
    onScanInit: () => any;
}
/**
 * 发现项目文件
 */
export interface PYIOnScanChange {
    onScanChange: () => any;
}
/**
 * 添加扫描的文件完成
 */
export interface PYIOnScanAfter {
    onScanAfter: () => any;
}
/**
 * 初始化 Application 配置
 */
export interface PYIOnConfigurationInit {
    onConfigurationInit: () => any;
}
/**
 * 配置初始化完成
 */
export interface PYIOnConfigurationAfter {
    onConfigurationAfter: (config: PYIAppConfiguration) => any;
}
/**
 * 初始化 Application 完成
 */
export interface PYIOnInitApplication {
    onInitApplication: () => any;
}
/**
 * install plugins
 */
export interface PYIOnPluginApplication {
    onPluginApplication: (plugins: PYICoreClass<PYIPlugins>) => any;
}
/**
 * PYI Class 基础类型
 */
export declare type PYIApplicationClass<V> = (new (...args: any[]) => V & PYIApplication) & typeof PYIApplication;
/**
 * 启动修饰器, 获取运行模式. 默认 development
 * @param tprops Application
 */
export declare function PYIBootstrap<VC extends PYIApplicationClass<PYIApplication>>(tprops: VC): VC;
export declare function PYIBootstrap<Props = any>(props: Props & any): <VC extends PYIApplicationClass<PYIApplication>>(target: VC) => VC;
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
    compile: Compile;
    logger: Signale;
    private _bootstrap;
    private ready?;
    constructor();
    /**
     * 初始化完成回调
     * @param callback 启动会掉
     */
    bootstrap(callback: () => any): Promise<unknown>;
    /**
     * 启动项目
     */
    starter(): Promise<void>;
    /**
     * 开始初始化 Application
     */
    private run;
}
