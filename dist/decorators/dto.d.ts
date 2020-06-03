import { PYICoreClass } from './../core/pyi';
import { PYICore } from '../core';
export declare class PYIDto extends PYICore {
    static _base(): typeof PYIDto;
    input(): this;
    output(): this;
}
export declare function Dto<PYIDTO extends PYICoreClass<PYIDto>>(target: PYIDTO): PYIDTO;
