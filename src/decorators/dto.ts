import { PYICore, PYIApp, PYICoreClass } from '../core';
import { red } from 'colors';

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

// tslint:disable-next-line:no-empty-interface
export interface PYIDtoThrows {
    throws: (errors: Error) => any;
}

export class PYIDto<Props = any> extends PYICore implements PYIDtoThrows {
    public static _base(): PYIApp {
        return PYIDto;
    }

    public props!: Props;

    public data: any;

    public throws(errors: Error) {
        console.log(red(JSON.stringify(errors)));
    }
}
