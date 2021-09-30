/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export function Component<VC extends PYICoreClass<PYIComponent>>(tprops: VC): VC;
export function Component<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIComponent>>(target: VC) => VC;
export function Component() {
    const [target] = arguments;
    if (target._base && target._base() === PYIComponent) {
        return target;
    }
    return (target: PYICoreClass<PYIComponent>) => {
        return target;
    };
}

export function autowired(target: any, key: string) {
}

export class PYIComponent extends PYICore {
    public static _base() {
        return PYIComponent;
    }
}
