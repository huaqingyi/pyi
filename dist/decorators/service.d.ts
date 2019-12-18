import { PYICore, PYIApp, PYICoreClass } from '../core';
export declare function Service<VC extends PYICoreClass<PYIService>>(tprops: VC): VC;
export declare function Service<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIService>>(target: VC) => VC;
export declare class PYIService<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
