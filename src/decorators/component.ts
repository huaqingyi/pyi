import { PYICore, PYIApp, PYICoreClass } from '../core';

export function Component<VC extends PYICoreClass<PYIComponent>>(tprops: VC): VC;
export function Component<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIComponent>>(target: VC) => VC;
export function Component(props: any | PYIApp) {
    if (props._base && props._base() === PYIComponent) {
        return props;
    }
    return (target: PYIApp) => {
        target.prototype.props = props;
        return target;
    };
}

export function autowired() {
    // ...
}
export class PYIComponent<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIComponent;
    }

    public props!: Props;
}
