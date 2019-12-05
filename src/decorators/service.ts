import { PYICore, PYIApp, PYICoreClass } from '../core';

export function Service<VC extends PYICoreClass<PYIService>>(tprops: VC): VC;
export function Service<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIService>>(target: VC) => VC;
export function Service<Props extends any>(props: Props): any {
    if (props._base && props._base() === PYIService) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export class PYIService<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIService;
    }

    public props!: Props;
}
