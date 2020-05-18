import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
import { isFunction } from 'lodash';

export class PYIService extends PYICore {

    public static _base() {
        return PYIService;
    }

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

/**
 * 服务组件
 * @param target service component
 * @param key off
 */
export function Service<S extends PYICoreClass<PYIService>>(target: S): S;
export function Service<Props = any>(props: Props): <S extends PYICoreClass<PYIService>>(target: S) => S;
export function Service(props: any) {
    const base = props && props._base && isFunction(props._base) && props._base();
    if (base === PYIService) {
        return base;
    }
    return (target: PYICoreClass<PYIService>) => {
        return target;
    };
}
