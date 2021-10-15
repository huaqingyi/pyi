/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';
import { Service, ServiceOptions, Inject } from 'typedi';

export function Component(tprops: any): void;
export function Component<Props = any>(props: ServiceOptions<Props>): (target: any) => void;
export function Component() {
    const [target] = arguments;
    if (target._base && target._base() === PYIComponent) {
        return Service()(target);
    }
    return (target: PYICoreClass<PYIComponent>) => {
        return Service(arguments[0])(target);
    };
}

export function autowired(target: any, key: string) {
    Inject()(target, key);
}

export class PYIComponent extends PYICore {
    public static _base() {
        return PYIComponent;
    }
}
