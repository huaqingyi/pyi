import { PYICore, PYIApp } from '../core';

export function Controller<Props extends any>(props: Props): any {
    if (props._base && props._base() === PYIController) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
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
