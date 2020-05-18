import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';

export class PYIDao extends PYICore {

    public static _base() {
        return PYIDao;
    }

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

export function Dao<PYIDAO extends PYICoreClass<PYIDao>>(target: PYIDAO): PYIDAO {
    return target;
}
