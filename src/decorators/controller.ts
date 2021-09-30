/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export interface ControllerConfiguration {
    prefix?: string;
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
}

export function Controller<VC extends PYICoreClass<PYIController>>(tprops: VC): VC;
export function Controller<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIController>>(target: VC) => VC;
export function Controller<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIController) {
        return target;
    } else {
        return (target: PYICoreClass<PYIController>) => {
            return target;
        };
    }
}

export class PYIController<Props = any> extends PYICore {
    public static _base() {
        return PYIController;
    }
}

export function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any {
    if (key) {
        return config;
    } else {
        return (target: any, key: string) => {
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
export function Middleware<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIMiddleware) {
        return target;
    } else {
        return (target: PYICoreClass<PYIMiddleware>) => {
            return target;
        };
    }
}

export class PYIMiddleware<Props = any> extends PYICore {
    public static _base() {
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
export function Interceptor<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIInterceptor) {
        return target;
    } else {
        return (target: PYICoreClass<PYIInterceptor>) => {
            return target;
        };
    }
}

export class PYIInterceptor<Props = any> extends PYICore {
    public static _base() {
        return PYIInterceptor;
    }

    public props!: Props;
}
