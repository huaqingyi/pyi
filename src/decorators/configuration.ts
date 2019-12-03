import { PYICore, PYIApp, PYICoreClass } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIController } from './controller';
import { PYIMiddleware } from './middleware';
import { PYIInterceptor } from './interceptor';

export function Configuration<VC extends PYICoreClass<PYIConfiguration>>(tprops: VC): VC;
export function Configuration<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIConfiguration>>(target: VC) => VC;
export function Configuration<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIConfiguration) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export class PYIConfiguration<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIConfiguration;
    }

    public props!: Props;
}

export class PYIAppConfiguration<Props = any> extends PYIConfiguration implements RoutingControllersOptions {
    public static _base(): PYIApp {
        return PYIConfiguration;
    }

    public props!: Props;

    public controllers: PYIController[];
    public middlewares: PYIMiddleware[];
    public interceptors: PYIInterceptor[];

    constructor() {
        super();
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
    }
}
