import { PYIDto } from './dto';
import { PYICoreClass } from './../core/pyi';
import { PYIApp } from '../core';
export declare function PYIExecption<V extends PYICoreClass<PYIThrows<any>>>(trys: V, dto?: PYICoreClass<PYIDto>): any;
export interface PYIThrows<Props> extends PYIApp {
    throws(this: Props): any;
}
