import { PYIDto } from './dto';
import { PYIDao } from './dao';
import { find, map } from 'lodash';
import { PYICore, PYICoreClass } from '../core';
import { isFunction } from 'util';
import Router from 'koa-router';
import { dirname } from 'path';
import { Context } from 'koa';

/**
 * Controller ================================
 */
export enum RequestMappingMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    LINK = 'link',
    UNLINK = 'unlink',
    DELETE = 'del',
    HEAD = 'head',
    OPTIONS = 'options',
    PATCH = 'patch',
    ALL = 'all',
}

export interface ControllerConfiguration {
    prefix?: string;
    auto?: boolean;
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
}

export interface ControllerActions {
    target: PYIController;
    method: string;
    config: ControllerRequestConfiguration;
    dao: PYICoreClass<PYIDao>;
    dto: PYICoreClass<PYIDto>;
}

export class PYIController extends PYICore {
    public static _base() {
        return PYIController;
    }

    constructor() {
        super();
    }
}

/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export function Controller<V extends PYICoreClass<PYIController>>(target: V): V;
export function Controller(
    config: ControllerConfiguration,
): <V extends PYICoreClass<PYIController>>(target: V) => V;
export function Controller(props: any) {
    const base = props && props._base && isFunction(props._base) && props._base();
    if (base === PYIController) {
        return props;
    }
    return (target: PYICoreClass<PYIController>) => {
        return target;
    };
}

export function RequestMapping(target: PYIController, method: string): TypedPropertyDescriptor<() => any>;
export function RequestMapping(
    config: ControllerRequestConfiguration
): (target: PYIController, method: string) => TypedPropertyDescriptor<() => any>;
export function RequestMapping(props: any, method?: string) {
    if (method) {
        return props;
    }
    return (target: PYIController, kmethod: string) => {
        return target;
    };
}
