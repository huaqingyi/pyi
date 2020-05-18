import { PYIDto } from './dto';
import { PYICoreClass } from './../core/pyi';
import { PYICore, PYIApp } from '../core';

export function PYIExecption<V extends PYICoreClass<PYIThrows<any>>>(
    trys: V, dto?: PYICoreClass<PYIDto>
): any {
    // ...
}

export interface PYIThrows<Props> extends PYIApp {
    throws(this: Props): any;
}
