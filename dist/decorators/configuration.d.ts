import { PYIController } from './controller';
import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
/**
 * Component base
 */
export declare class PYIConfiguration<Props = any> extends PYICore {
    static _base(): typeof PYIConfiguration;
    props: Props;
    input(): this;
    output(): this;
}
export declare class PYIAppConfiguration<Props = any> extends PYICore {
    static _base(): typeof PYIAppConfiguration;
    props: Props;
    controllers: Array<PYICoreClass<PYIController>>;
    constructor(props?: Props);
    input(): this;
    output(): this;
}
/**
 * 普通配置
 * @param target PYIConfiguration 类
 */
export declare function Configuration<V extends PYICoreClass<PYIConfiguration<any>>>(target: V): V;
export declare function Configuration<Props = any>(config: Props): <V extends PYICoreClass<PYIConfiguration<Props>>>(target: V) => V;
/**
 * 系统配置
 * @param target PYIAppConfiguration
 */
export declare function Configuration<V extends PYICoreClass<PYIAppConfiguration<any>>>(target: V): V;
export declare function Configuration<Props = any>(config: Props): <V extends PYICoreClass<PYIAppConfiguration<Props>>>(target: V) => V;
