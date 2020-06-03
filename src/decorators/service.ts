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
export function Service<V extends PYICoreClass<PYIService>>(target: V): V {
    return target;
}
