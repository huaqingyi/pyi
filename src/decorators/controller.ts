import { PYICore, PYIApp, PYICoreClass } from '../core';

import {
    JsonController, Method,
    Middleware as RMiddleware,
    Interceptor as RInterceptor,
    Body as RBody,
    BodyOptions
} from 'routing-controllers';
import { ActionType } from 'routing-controllers/metadata/types/ActionType';
import { map } from 'lodash';

export * from 'routing-controllers';

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
            JsonController(prefix ? prefix : undefined)(target);
            return target;
        };
    }
}

export class PYIController<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIController;
    }

    public props!: Props;
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
                Method(m as ActionType, prefix)(target, key);
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
