/**
 * 本框架设计为 制造者 -> 产品
 * 核心标准, 这里作为所有产品的基本属性
 *
 * This framework is designed as manufacturer - > Product
 * Core standard, which is the basic attribute of all products
 */
export declare type PYICoreClass<V extends PYICoreStandard> = (new (...args: any[]) => V);
export declare abstract class PYICoreStandard {
    [x: string]: any;
    static __proto__: any;
    static _root: PYICoreClass<any>;
    static _extends: PYICoreClass<any>;
    static _base: PYICoreClass<any>;
}
/**
 * 标准输入输出接口
 * 这里更具环境输出需要的配置和类
 *
 * is standard I / O interface .
 * is more environment _output your classes ro configuration .
 */
export interface PYIApp {
    [x: string]: any;
}
export interface PYICoreIO extends PYIApp {
    mode: string;
    path: string;
    _input: (...props: any[]) => PYIApp | Promise<PYIApp>;
    _output: () => PYIApp | Promise<PYIApp>;
}
export declare class PYICore implements PYICoreIO {
    [x: string]: any;
    static __proto__: any;
    static _i: PYICore;
    static _root(): PYIApp;
    static _base(): PYIApp;
    static _extends(): any;
    static _singleton(...props: any): PYICore;
    readonly mode: string;
    readonly path: string;
    _input(...props: any): PYIApp | Promise<PYIApp>;
    _output(...props: any): PYIApp | Promise<PYIApp>;
}
