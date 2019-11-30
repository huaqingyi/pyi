import { PYICore, PYIApp } from '../core';

export function Dao<Props extends any>(props: Props): any {
    if (props._base && props._base() === PYIDao) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export class PYIDao<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIDao;
    }

    public props!: Props;
}
