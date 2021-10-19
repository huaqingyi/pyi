/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { Socket } from 'net';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { ApplicationLoaded } from '../core';
import { PYICore } from '../extensions';
import { join } from 'path';
import { readFileSync } from 'fs-extra';
import Router from 'koa-router';
import { map } from 'lodash';
import { useConfiguraion, useEnv } from '../composition/properties';
import { createServer } from 'http';

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
    const isgetter = useEnv('config');
    const env = useEnv();
    let next = Promise.resolve({});
    if (env === 'development' || isgetter) {
        const loaded = new ApplicationLoaded();
        next = loaded.loaded();
    }
    const pyi: PYIApplication = new target();
    global.pyi = pyi;
    next.then(() => pyi.onCreated && pyi.onCreated()).then(() => {
        const cpath = join(useConfiguraion().APP_PATH, useConfiguraion().APP_RUNTIME, 'routes.json');
        const routes: any[] = JSON.parse(readFileSync(cpath).toString());
        const router = new Router();
        map(routes, route => {
            router.all(route.path, async (ctx, next) => {
                if (route.methods.indexOf(ctx.method.toLocaleUpperCase()) === -1) {
                    ctx.status = 404;
                    ctx.body = 'Not Found';
                    return await next();
                }
                const Controller = (await import(route.controller)).default;
                Controller.prototype.ctx = ctx;
                const controller = new Controller(ctx);
                ctx.body = await controller[route.action]();
                return await next();
            });
        });
        pyi.use(router.routes()).use(router.allowedMethods());
        return pyi;
    }).then(() => {
        return createServer(pyi.callback()).on('clientError', (err: Error & any, socket: Socket) => {
            // console.log('clientError', err.rawPacket.toString());
            socket.on('close', () => {
                console.log('tcp closed');
            });
            const packet = err.rawPacket;
            socket.write(packet);
        }).listen(useConfiguraion().PORT, useConfiguraion().HOST, () => {
            console.info(`listenning: http://${useConfiguraion().HOST}:${useConfiguraion().PORT}`);
        });
    });
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

    public get config() {
        return useConfiguraion;
    }

    public get configuration() {
        return this.config();
    }

    constructor() {
        super();
        const [_node, path] = process.argv;
    }

    public onCreated() { }

    public onMounted() { }
}

export type PYIApplicationClass<V> = (new (...args: any[]) => V & PYIApplication) & typeof PYIApplication;

export const pyi: PYIApplication = global.pyi;
