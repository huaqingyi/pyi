import { PYICore, PYIApp } from '../core';

export function Dto<Props extends any>(props: Props): any {
    if (props._base && props._base() === PYIDto) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export class PYIDto<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIDto;
    }

    public props!: Props;
}
