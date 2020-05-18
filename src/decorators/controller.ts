import { PYICore, PYICoreClass } from '../core';
import { isFunction } from 'util';

/**
 * Controller ================================
 */
export enum RequestMappingMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH'
}

export interface ControllerConfiguration {
    prefix?: string;
    auto?: boolean;
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
}

export class PYIController extends PYICore {
    public static _base() {
        return PYIController;
    }

    public input() {
        return this;
    }

    public output() {
        return this;
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
