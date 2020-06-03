import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
export declare class PYIDao extends PYICore {
    static _base(): typeof PYIDao;
    input(): this;
    output(): this;
}
export declare function Dao<PYIDAO extends PYICoreClass<PYIDao>>(target: PYIDAO): PYIDAO;
