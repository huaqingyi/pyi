import { PYICore, PYIApp, PYICoreClass } from '../core';
export declare function Dto<VC extends PYICoreClass<PYIDto>>(tprops: VC): VC;
export declare function Dto<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIDto>>(target: VC) => VC;
export interface PYIDtoThrows {
    throws: (errors: Error) => any;
}
export declare class PYIDto<Props = any> extends PYICore implements PYIDtoThrows {
    static _base(): PYIApp;
    props: Props;
    data: any;
    throws(errors: Error): void;
}
