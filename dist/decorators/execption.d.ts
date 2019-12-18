import { PYICoreClass, PYICore, PYIApp } from '../core';
export declare function PYIExecption<Props extends PYICoreClass<PYIThrows<any>>>(execption: Props): any;
export declare class PYIThrows<Props> extends PYICore {
    static _base(): PYIApp;
    throws(this: Props): void;
}
