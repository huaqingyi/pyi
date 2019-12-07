import { PYICore, PYIApp, PYICoreClass } from '../core';
import { isFunction } from 'lodash';
import { PYIConfiguration, PYIAppConfiguration } from './configuration';

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

export enum ComponentWiredType {
    AUTOCONNECT = 'autoconnect',
    AUTOWIRED = 'autowired'
}

export function auto(type: string) {
    return (target: any, key: string) => {
        /**
         * 容错
         */
        if (!target.constructor._pyi) { target.constructor._pyi = () => ({}); }
        /**
         * 获取注入类
         */
        const params = Reflect.getMetadata('design:type', target, key);
        /**
         * 是否嵌套依赖
         */
        if (!params._pyi || !params._pyi().autowired) {
            const { props } = params.prototype;
            let instance;
            if (
                (params._base && isFunction(params._base) && params._base() === PYIConfiguration) ||
                (params._base && isFunction(params._base) && params._base() === PYIAppConfiguration)
            ) {
                (async () => {
                    switch (type) {
                        case ComponentWiredType.AUTOWIRED:
                            instance = await params._pyiruntime(props);
                            break;
                        case ComponentWiredType.AUTOCONNECT:
                            instance = await params._pyiconnect(props);
                            break;
                        default: return target;
                    }
                    instance = await instance._pyiruntime();
                    target.constructor.prototype[key] = await instance;
                })();
            } else {
                switch (type) {
                    case ComponentWiredType.AUTOWIRED:
                        console.log(11, instance);
                        instance = params._pyiruntime();
                        console.log(1, instance);
                        break;
                    case ComponentWiredType.AUTOCONNECT:
                        console.log(22, instance);
                        instance = params._pyiconnect();
                        console.log(2, instance);
                        break;
                    default: return target;
                }
                console.log(key, params, instance);
                target.constructor.prototype[key] = instance;
            }
        } else {
            /**
             * 嵌套依赖
             */
            const _pyi = target.constructor._pyi();
            if (!_pyi.autowired) {
                target.constructor._pyi = () => ({
                    ..._pyi,
                    autowired: [
                        ...(_pyi.autowired || []),
                        key
                    ]
                });
            }
        }
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
