import { PYICore, PYIApp, PYICoreClass } from '../core';
import { ValidationError } from 'class-validator';

export function Dao<VC extends PYICoreClass<PYIDao>>(tprops: VC): VC;
export function Dao<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIDao>>(target: VC) => VC;
export function Dao<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIDao) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export interface PYIDaoThrow {
    throw: (errors: ValidationError[]) => any;
}

export class PYIDao<Props = any> extends PYICore {
    public static swaggerDocument: any;
    public static _base(): PYIApp {
        return PYIDao;
    }

    public props!: Props;
}
