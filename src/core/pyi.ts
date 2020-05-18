/**
 * 本框架设计为 制造者 -> 产品
 * 核心标准, 这里作为所有产品的基本属性
 * 
 * This framework is designed as manufacturer - > Product
 * Core standard, which is the basic attribute of all products
 */
export type PYICoreClass<V extends PYICoreStandard> = (
    new (...args: any[]) => V
);
export abstract class PYICoreStandard {
    [x: string]: any;
    public static __proto__: any;

    public static _root: PYICoreClass<any>;

    public static _extends: PYICoreClass<any>;

    public static _base: PYICoreClass<any>;
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

export class PYICore implements PYICoreIO {
    [x: string]: any;
    public static __proto__: any;
    public static _i: PYICore;

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base(): PYIApp {
        return PYICore;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _singleton(...props: any) {
        if (!this._i) {
            this._i = new this();
        }
        return this._i;
    }

    public readonly mode!: string;
    public readonly path!: string;

    public _input(...props: any): PYIApp | Promise<PYIApp> {
        return this;
    }

    public _output(...props: any): PYIApp | Promise<PYIApp> {
        return Promise.resolve(this[this.mode]).then(async (action) => {
            // tslint:disable-next-line: no-unused-expression
            action && await action.apply(this);
            return await this;
        });
    }
}
