/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export function Dao<VC extends PYICoreClass<PYIDao>>(tprops: VC): VC;
export function Dao<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIDao>>(target: VC) => VC;
export function Dao<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIDao) {
    } else {
        return (target: PYICoreClass<PYIDao>) => {
        };
    }
}

export class PYIDao<Props = any> extends PYICore {
    public static _base() {
        return PYIDao;
    }
}
