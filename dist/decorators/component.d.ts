import { PYICore, PYIApp, PYICoreClass } from '../core';
export declare function Component<VC extends PYICoreClass<PYIComponent>>(tprops: VC): VC;
export declare function Component<Props = any>(props: Props & any): <VC extends PYICoreClass<PYIComponent>>(target: VC) => VC;
export declare enum ComponentWiredType {
    AUTOCONNECT = "autoconnect",
    AUTOWIRED = "autowired"
}
export declare function auto(type: string): (target: any, key: string) => any;
export declare function autowired(target: any, key: string): any;
export declare function autoconnect(target: any, key: string): any;
export declare class PYIComponent<Props = any> extends PYICore {
    static _base(): PYIApp;
    props: Props;
}
