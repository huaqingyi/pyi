/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import Koa, { DefaultState, DefaultContext } from 'koa';
import { ApplicationLoaded } from '../core';
import { PYICore } from '../extensions';
import { dirname, join } from 'path';
import { readFileSync } from 'fs-extra';
import Router from 'koa-router';
import { map } from 'lodash';

declare namespace NodeJS {
    export interface Global {
        pyi: PYIApplication;
    }
}

export interface OnCreated {
    onCreated(): void;
}

export interface OnMounted {
    onMounted(): void;
}

export function PYIBootstrap(target: any) {
    const pyi: PYIApplication = new target();
    global.pyi = pyi;
    const loaded = new ApplicationLoaded();
    loaded.loaded().then(() => pyi.onCreated && pyi.onCreated()).then(() => {
        const routes: any[] = JSON.parse(readFileSync(join(pyi.RUNTIME_PATH, 'routes.json')).toString());
        const router = new Router();
        map(routes, route => {
            map(route.methods, )
        });
        console.log(routes);
    });
    // pyi.use(async (ctx, next) => {
    //     // ctx.path
    // });
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

    public APP_PATH: string;
    public APPLICATION_PATH: string;
    public RUNTIME_PATH!: string;

    constructor() {
        super();
        const [_node, path] = process.argv;
        this.APPLICATION_PATH = path;
        this.APP_PATH = dirname(this.APPLICATION_PATH);
    }

    public onCreated() { }

    public onMounted() { }
}

export type PYIApplicationClass<V> = (new (...args: any[]) => V & PYIApplication) & typeof PYIApplication;

export const pyi: PYIApplication = global.pyi;
