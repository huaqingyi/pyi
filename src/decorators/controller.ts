import { isFunction, map } from 'lodash';
import { PYICore } from '../core';
import {
    JsonController, Method,
    Middleware as RMiddleware,
    Interceptor as RInterceptor,
    Body as RBody,
    BodyOptions
} from 'routing-controllers';
import { ActionType } from 'routing-controllers/metadata/types/ActionType';
import { throws, PYIExecption, PYIThrows } from './execption';
import { ValidationError } from 'class-validator';

export * from 'routing-controllers';

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
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
}

export abstract class PYIController extends PYICore {
    public static _pyi: () => any;
    public static _root() {
        return PYIController;
    }
}

/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export function Controller<Props = ControllerConfiguration | PYIController>(config: Props): any {
    if (isFunction(config)) {
        JsonController(undefined)(config as any);
    } else {
        return (target: any, key?: string) => {
            const { prefix } = config as ControllerConfiguration;
            JsonController(prefix ? prefix : undefined)(target);
        };
    }
}

export function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any {
    if (key) {
        map(RequestMappingMethod, (m) => {
            Method(m as any, undefined)(config, key);
        });
        return throws(config, key);
    } else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target: any, key: string) => {
            const { prefix, methods } = config as ControllerRequestConfiguration;
            map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                Method(m as ActionType, prefix)(target, key);
            });
            return throws(target, key);
        };
    }
}

/**
 * Middleware ===============================================
 */

// tslint:disable-next-line:max-classes-per-file
export abstract class PYIMiddleware extends PYICore {
    public static _pyi: () => any;
    public static _root() {
        return PYIMiddleware;
    }
}

/**
 * Extends for routing-controllers middleware
 * @param options extends routing-controllers middleware
 */
export function Middleware(
    options: {
        type: 'after' | 'before';
        priority?: number;
    }
) {
    return (target: any, key?: string) => {
        RMiddleware(options)(target);
    };
}

// tslint:disable-next-line:max-classes-per-file
export abstract class PYIInterceptor extends PYICore {
    public static _pyi: () => any;
    public static _root() {
        return PYIInterceptor;
    }

    constructor(...props: any) { super(); }
}

/**
 * Extends for routing-controllers Interceptor
 * @param options extends routing-controllers Interceptor
 */
export function Interceptor(options?: { priority?: number; }) {
    return (target: any, key?: string) => {
        RInterceptor(options)(target);
    };
}

export function Body(options: BodyOptions) {
    return (target: any, key: string, idx: number) => {
        RBody({ ...options, validate: false })(target, key, idx);
        const fn = target[key];
        // tslint:disable-next-line:only-arrow-functions
        target[key] = function(...args: any[]) {
            const valid = args[idx];
            return valid.validate().then((errors: ValidationError[]) => {
                if (options.validate === true) {
                    if (errors.length === 0) { return fn(...args); }
                    return valid.throws.apply(this, errors);
                } else {
                    return fn(...args, errors);
                }
            });
        };
        return target[key];
    };
}
