/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import Koa, { DefaultState, DefaultContext } from 'koa';
import { ApplicationLoaded } from '../core';
import { PYICore, PYICoreClass } from '../extensions';

export function PYIBootstrap<B extends Function>(target: B): B {
    const loaded = new ApplicationLoaded();
    return target;
}

/**
 * 继承 Koa 主类
 */
export class PYIApplication<StateT = DefaultState, CustomT = DefaultContext> extends Koa<StateT, CustomT> {
    public static __proto__: any;

    public static _root(): typeof PYICore {
        return PYICore;
    }

    public static _base(): typeof PYIApplication {
        return PYIApplication;
    }

    public static _extends() {
        return this.__proto__;
    }

    public _root(): typeof PYICore {
        return PYICore;
    }

    public _base(): typeof PYIApplication {
        return PYIApplication;
    }

    constructor() {
        super();
    }
}
