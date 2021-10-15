/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export function Dto<VC extends PYICoreClass<PYIDto>>(tprops: VC): VC;
export function Dto<Props = any>(props: Props): <VC extends PYICoreClass<PYIDto>>(target: VC) => VC;
export function Dto<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIDto) {
    } else {
        return (target: PYICoreClass<PYIDto>) => {
        };
    }
}

export class PYIDto<Props = any> extends PYICore {
    public static _base() {
        return PYIDto;
    }
}
