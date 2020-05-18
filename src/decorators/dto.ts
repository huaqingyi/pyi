import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';

export class PYIDto extends PYICore {

    public static _base() {
        return PYIDto;
    }

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

export function Dto<PYIDTO extends PYICoreClass<PYIDto>>(target: PYIDTO): PYIDTO {
    return target;
}
