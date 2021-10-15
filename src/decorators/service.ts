/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';
import { Service as S, ServiceOptions } from 'typedi';

export function Service<VC extends PYICoreClass<PYIService>>(tprops: VC): VC;
export function Service<Props = any>(
    props: ServiceOptions<Props>
): <VC extends PYICoreClass<PYIService>>(target: VC) => VC;
export function Service() {
    const [target] = arguments;
    if (target._base && target._base() === PYIService) {
        return S()(target);
    }
    return (target: PYICoreClass<PYIService>) => S(arguments[0])(target);
}

export class PYIService<Props = any> extends PYICore {
    public static _base() {
        return PYIService;
    }
}
