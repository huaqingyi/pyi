import { PYICore, PYIApp, PYICoreClass } from '../core';

import {
    Middleware as RMiddleware,
    Interceptor as RInterceptor,
    getMetadataArgsStorage,
    ActionMetadata,
} from '../extends';
import { map } from 'lodash';
import { ActionType } from 'routing-controllers/metadata/types/ActionType';
import { Context } from 'koa';
// tslint:disable-next-line:no-var-requires
const pathToRegExp = require('path-to-regexp');
import jwt from 'jsonwebtoken';
import { ResponseDto } from './dto';

export * from '../extends';

/**
 * Controller ================================
 */
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
    M_SEARCH = 'm-search',
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
    prefix?: string;
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | RequestMappingMethod[];
    description?: string;
    summary?: string;
    swaggerDocument?: any;
    security?: any[];
}

export function JsonController(baseRoute?: string) {
    return <VC extends PYICoreClass<PYIController>>(control: VC): VC => {
        (getMetadataArgsStorage().actions as any) = map(getMetadataArgsStorage().actions, (action) => {
            const { target, route } = action;
            if (target === control) {
                const path = pathToRegExp(ActionMetadata.appendBaseRoute(baseRoute || '', route));
                return { ...action, path };
            }
            return action;
        });
        getMetadataArgsStorage().controllers.push({
            type: 'json', target: control, route: baseRoute || ''
        });
        return control;
    };
}

export function Controller<VC extends PYICoreClass<PYIController>>(tprops: VC): VC;
export function Controller<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIController>>(target: VC) => VC;
export function Controller<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIController) {
        JsonController(undefined)(props as any);
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            const { prefix } = props;
            JsonController(prefix ? prefix : undefined)(target as any);
            return target;
        };
    }
}

type NewType = Promise<Function[]> | Function[];

export interface PYIServletController {
    excludeJWT?: () => NewType;
    servlet?: (
        action: Function,
        secretKey: string,
        context: any,
        next: (err?: any) => Promise<any>
    ) => any;
}

export class PYIController<Props = any> extends PYICore implements PYIServletController {
    public static _base(): PYIApp {
        return PYIController;
    }

    public props!: Props;

    // public excludeJWT() {
    //     return [];
    // }

    public async servlet(action: Function, secretKey: string, context: any, next: (err?: any) => Promise<any>) {
        jwt.verify(context.header.authorization, secretKey, async (err: any, decode: any) => {
            if (err) {
                const dto = new ResponseDto({});
                dto.errcode = 1000;
                context.body = await dto.throws(err);
                await next(context);
            } else {
                context.state.token = decode;
                await next();
            }
        });
    }
}

export function Method(method, route, docs?: any) {
    return (object, methodName) => {
        getMetadataArgsStorage().actions.push({
            type: method,
            target: object.constructor,
            method: methodName,
            route, docs,
        } as any);
    };
}

export function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any {
    if (key) {
        map(RequestMappingMethod, (m) => {
            Method(m as any, undefined)(config, key);
        });
    } else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target: any, key: string) => {
            const { prefix, methods } = config as ControllerRequestConfiguration;
            map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                Method(m as ActionType, prefix, config)(target, key);
            });
        };
    }
}

export interface PYIMiddlewareProps {
    type: 'after' | 'before';
    priority?: number;
}

export function Middleware<VC extends PYICoreClass<PYIMiddleware>>(tprops: VC): VC;
export function Middleware<Props = PYIMiddlewareProps>(
    props: Props & PYIMiddlewareProps
): <VC extends PYICoreClass<PYIMiddleware>>(target: VC) => VC;
export function Middleware<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIMiddleware) {
        props.prototype.props = { type: 'before' };
        RMiddleware({ type: 'before' })(props);
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            RMiddleware(props as any)(target);
            return target;
        };
    }
}

export class PYIMiddleware<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIMiddleware;
    }

    public props!: Props;
}

export interface PYIInterceptorProps {
    priority?: number;
}

export function Interceptor<VC extends PYICoreClass<PYIInterceptor>>(tprops: VC): VC;
export function Interceptor<Props = PYIInterceptorProps>(
    props: Props & PYIInterceptorProps
): <VC extends PYICoreClass<PYIInterceptor>>(target: VC) => VC;
export function Interceptor<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIInterceptor) {
        props.prototype.props = {};
        RInterceptor()(props);
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            RInterceptor(props)(target);
            return target;
        };
    }
}

export class PYIInterceptor<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIInterceptor;
    }

    public props!: Props;
}
