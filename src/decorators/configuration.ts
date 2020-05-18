import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
import { isFunction } from 'util';

/**
 * Component base
 */
export class PYIConfiguration<Props = any> extends PYICore {
    public static _base() {
        return PYIConfiguration;
    }

    public props!: Props;

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

export class PYIAppConfiguration<Props = any> extends PYICore {
    public static _base() {
        return PYIAppConfiguration;
    }

    public props!: Props;

    constructor(props?: Props) {
        super();
    }

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

/**
 * 普通配置
 * @param target PYIConfiguration 类
 */
export function Configuration<V extends PYICoreClass<PYIConfiguration<any>>>(target: V): V;
export function Configuration<Props = any>(
    config: Props
): <V extends PYICoreClass<PYIConfiguration<Props>>>(target: V) => V;
/**
 * 系统配置
 * @param target PYIAppConfiguration
 */
export function Configuration<V extends PYICoreClass<PYIAppConfiguration<any>>>(target: V): V;
export function Configuration<Props = any>(
    config: Props
): <V extends PYICoreClass<PYIAppConfiguration<Props>>>(target: V) => V;
export function Configuration(props: any) {
    const base = props && props._base && isFunction(props._base) && props._base();
    switch (base) {
        case PYIConfiguration: {
            return props;
        };
        case PYIAppConfiguration: {
            return props;
        };
        default: return (target: PYICoreClass<PYIConfiguration>) => {
            return target;
        };
    }
}
