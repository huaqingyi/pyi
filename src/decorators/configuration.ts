import { PYICore, PYIApp } from '../core';

export function Configuration<Props extends any>(props: Props): any {
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

export class PYIAppConfiguration<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIConfiguration;
    }

    public props!: Props;
}
