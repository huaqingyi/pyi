/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { Context } from 'koa';
import { Service } from 'typedi';
import { PYICore, PYICoreClass } from '../extensions';

export enum RequestMappingMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH',
    CONNECT = 'CONNECT',
    CHECKOUT = 'CHECKOUT',
    COPY = 'COPY',
    HEAD = 'HEAD',
    LOCK = 'LOCK',
    MERGE = 'MERGE',
    MKACTIVITY = 'MKACTIVITY',
    MKCOL = 'MKCOL',
    MOVE = 'MOVE',
    M_SEARCH = 'M-SEARCH',
    NOTIFY = 'NOTIFY',
    OPTIONS = 'OPTIONS',
    PROPFIND = 'PROPFIND',
    PROPPATCH = 'PROPPATCH',
    PURGE = 'PURGE',
    REPORT = 'REPORT',
    SEARCH = 'SEARCH',
    SUBSCRIBE = 'SUBSCRIBE',
    TRACE = 'TRACE',
    UNLOCK = 'UNLOCK',
    UNSUBSCRIBE = 'UNSUBSCRIBE'
}

export interface ControllerConfiguration {
    prefix?: string | string | RegExp | RegExp[];
    methods?: RequestMappingMethod[];
}

export const CONTROLLER_KEY = Symbol('CONTROLLER_KEY');
export const CONTROLLER_ACTION_KEY = Symbol('CONTROLLER_ACTION_KEY');

export function Controller<VC extends PYICoreClass<PYIController>>(tprops: VC): VC;
export function Controller<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIController>>(target: VC) => VC;
export function Controller<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIController) {
        Reflect.defineMetadata(CONTROLLER_KEY, { prefix: '/', methods: [] }, target);
        Service()(target);
    } else {
        return (target: PYICoreClass<PYIController>) => {
            Reflect.defineMetadata(CONTROLLER_KEY, { prefix: '/', methods: [], ...arguments[0] }, target);
            Service()(target);
        };
    }
}

export class PYIController<Props = any> extends PYICore {
    public static _base() {
        return PYIController;
    }
    
    public ctx!: Context;
}

export interface ControllerRequestConfiguration {
    path?: string | string | RegExp | RegExp[];
    methods?: RequestMappingMethod[];
}

export const REQUESTMAPPING_KEY = Symbol('REQUESTMAPPING_KEY');

export function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any {
    if (key) {
        const actions = Reflect.getMetadata(CONTROLLER_ACTION_KEY, config.constructor) || [];
        actions.push(key);
        Reflect.defineMetadata(CONTROLLER_ACTION_KEY, actions, config.constructor);
        Reflect.defineMetadata(REQUESTMAPPING_KEY, { path: '/', methods: [] }, config, key);
        return config;
    } else {
        return (target: any, key: string) => {
            const actions = Reflect.getMetadata(CONTROLLER_ACTION_KEY, target.constructor) || [];
            actions.push(key);
            Reflect.defineMetadata(CONTROLLER_ACTION_KEY, actions, target.constructor);
            Reflect.defineMetadata(REQUESTMAPPING_KEY, { path: '/', methods: [], ...config }, target, key);
            return target;
        };
    }
}
