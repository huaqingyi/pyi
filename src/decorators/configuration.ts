/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export function Configuration<VC extends PYICoreClass<PYIConfiguration>>(tprops: VC): VC;
export function Configuration<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIConfiguration>>(target: VC) => VC;
export function Configuration<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIConfiguration) {
        return target;
    } else {
        return (target: PYICoreClass<PYICore>) => {
            return target;
        };
    }
}

export class PYIConfiguration extends PYICore {

    public static _base() {
        return PYIConfiguration;
    }
}
