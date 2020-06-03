import { FactoryComponent, ComponentWiredType } from '../factory/factory.component';
import { PYICore, PYICoreClass } from '../core';
export declare class PYIComponent<Props = any> extends PYICore {
    static _base(): typeof PYIComponent;
    props: Props;
    constructor(props?: Props);
    input(): this;
    output(): this;
}
export declare function Component<V extends PYICoreClass<PYIComponent<any>>>(target: V): V;
export declare function Component<Props = any>(config: Props): <V extends PYICoreClass<PYIComponent<Props>>>(target: V) => V;
export interface AutowiredConfiguration {
    [x: string]: any;
    singleton?: boolean;
}
/**
 * 自动注入新类
 * @param target classes(主类)
 * @param key prototype(键)
 */
export declare function autowired(target: any, method: string): any;
export declare function autowired(config: AutowiredConfiguration): (target: any, metod: string) => any;
export declare function wired(method: string, injeactor: PYICore, type?: ComponentWiredType, props?: AutowiredConfiguration): FactoryComponent;
