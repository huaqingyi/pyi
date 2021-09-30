/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export function Service<VC extends PYICoreClass<PYIService>>(tprops: VC): VC;
export function Service<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIService>>(target: VC) => VC;
export function Service<Props extends any>(props: Props): any {
    const [target] = arguments;
    if (target._base && target._base() === PYIService) {
        return target;
    } else {
        return (target: PYICoreClass<PYIService>) => {
            return target;
        };
    }
}

export class PYIService<Props = any> extends PYICore {
    public static _base() {
        return PYIService;
    }
}
