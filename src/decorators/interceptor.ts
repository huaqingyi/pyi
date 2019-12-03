import { PYICoreClass, PYICore, PYIApp } from '../core';

export function Interceptor<VC extends PYICoreClass<PYIInterceptor>>(tprops: VC): VC;
export function Interceptor<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIInterceptor>>(target: VC) => VC;
export function Interceptor<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIInterceptor) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
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
