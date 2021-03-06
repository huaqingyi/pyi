import { PYICore } from '../core';
export declare enum ComponentWiredType {
    AUTOCONNECT = "autoconnect",
    AUTOWIRED = "autowired"
}
export declare class FactoryComponent extends PYICore {
    key: string;
    component: any;
    type: ComponentWiredType;
    props?: any;
    static _base(): typeof FactoryComponent;
    target: any;
    constructor(key: string, component: any, type: ComponentWiredType, props?: any);
    _input(target: any): Promise<void>;
    _base(): typeof FactoryComponent;
    _output(): Promise<any>;
}
