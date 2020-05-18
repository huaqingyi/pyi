import { FactoryComponent, ComponentWiredType } from '../factory/factory.component';
import { isFunction } from 'lodash';
import { PYICore, PYICoreClass } from '../core';
import { PYIConfiguration, PYIAppConfiguration } from './configuration';

export class PYIComponent<Props = any> extends PYICore {

    public static _base() {
        return PYIComponent;
    }

    public props!: Props;

    constructor(props?: Props) {
        super();
    }

    public input() {
        return this;
    }

    public output() {
        return this;
    }
}

export function Component<V extends PYICoreClass<PYIComponent<any>>>(target: V): V;
export function Component<Props = any>(
    config: Props
): <V extends PYICoreClass<PYIComponent<Props>>>(target: V) => V;
export function Component(props: any) {
    const base = props && props._base && isFunction(props._base) && props._base();
    if (base === PYIComponent) {
        return props;
    }

    return (target: PYICoreClass<PYIComponent>) => {
        return target;
    };
}

export interface AutowiredConfiguration {
    [x: string]: any;
    singleton?: boolean;
}

/**
 * 自动注入新类
 * @param target classes(主类)
 * @param key prototype(键)
 */
// tslint:disable-next-line: adjacent-overload-signatures
export function autowired(target: any, method: string): any;
export function autowired(
    config: AutowiredConfiguration
): (target: any, metod: string) => any;
export function autowired(props: any, method?: string) {
    if (method) {
        const C = Reflect.getMetadata('design:type', props, method);
        props[method] = wired(method, C);
        return props[method];
    }
    return (target: any, kmethod: string) => {
        const C = Reflect.getMetadata('design:type', target, kmethod);
        target[kmethod] = wired(kmethod, C, props.singleton, props);
        return target[kmethod];
    };
}

export function wired(
    method: string,
    injeactor: PYICore,
    type?: ComponentWiredType,
    props?: AutowiredConfiguration,
) {
    if (
        injeactor._base() === PYIConfiguration ||
        injeactor._base() === PYIAppConfiguration
    ) {
        return new FactoryComponent(method, injeactor, type ? type : ComponentWiredType.AUTOCONNECT, props);
    }
    return new FactoryComponent(method, injeactor, type ? type : ComponentWiredType.AUTOWIRED, props);
}
