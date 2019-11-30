import { PYICore, PYIApp } from '../core';

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
