import { PYICore, PYIApp, PYICoreClass } from '../core';
import { ValidationError } from 'class-validator';
export declare function Dao<VC extends PYICoreClass<PYIDao>>(tprops: VC): VC;
export declare function Dao<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIDao>>(target: VC) => VC;
export interface PYIDaoThrow {
    throw: (errors: ValidationError[]) => any;
}
export declare class PYIDao<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
