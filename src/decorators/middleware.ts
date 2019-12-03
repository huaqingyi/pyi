import { PYICoreClass, PYICore, PYIApp } from '../core';

export function Middleware<VC extends PYICoreClass<PYIMiddleware>>(tprops: VC): VC;
export function Middleware<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIMiddleware>>(target: VC) => VC;
export function Middleware<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIMiddleware) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
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
