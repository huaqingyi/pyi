import { PYICore, PYIApp, PYICoreClass } from '../core';

export function Dto<VC extends PYICoreClass<PYIDto>>(tprops: VC): VC;
export function Dto<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIDto>>(target: VC) => VC;
export function Dto<Props extends any>(props: Props) {
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
