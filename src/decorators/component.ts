import { PYICore, PYIApp, PYICoreClass } from '../core';
import { isFunction } from 'lodash';
import { PYIConfiguration, PYIAppConfiguration } from './configuration';
import { FactoryComponent, ComponentWiredType } from '../factory';

export function Component<VC extends PYICoreClass<PYIComponent>>(tprops: VC): VC;
export function Component<Props = any>(
    props: Props & any
): <VC extends PYICoreClass<PYIComponent>>(target: VC) => VC;
export function Component(props: any | PYIApp) {
    if (props._base && props._base() === PYIComponent) {
        return props;
    }
    return (target: PYIApp) => {
        target.prototype.props = props;
        return target;
    };
}

export function auto(type: ComponentWiredType) {
    return (target: any, key: string) => {
        const params = Reflect.getMetadata('design:type', target, key);
        const { props } = params.prototype;
        target.constructor.prototype[key] = new FactoryComponent(key, params, type, props);
        return target.constructor.prototype[key];
    };
}

export function autowired(target: any, key: string) {
    return auto(ComponentWiredType.AUTOWIRED)(target, key);
}

export function autoconnect(target: any, key: string) {
    return auto(ComponentWiredType.AUTOCONNECT)(target, key);
}

export class PYIComponent<Props = any> extends PYICore {
    public static _base(): PYIApp {
        return PYIComponent;
    }

    public props!: Props;
}
