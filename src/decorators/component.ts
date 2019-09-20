import { isFunction } from 'lodash';
import { PYIBase } from '../core/pyi.base';
import { PYIAutoConfiguration } from './configuration';
import { PYIAutoAppConfiguration } from '../core';
import { PYIArgs } from '../lib';

/**
 * Component base
 */
export abstract class PYIComponent<Props> extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIComponent;
    }

    public props?: Props;

    constructor(...props: any) { super(); }
}

/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
export function Component<Props = any>(config: Props): any {
    const { _extends } = (config as any);
    /**
     * 如果是直接修饰类
     */
    if (_extends && isFunction(_extends) && _extends() === PYIComponent) {
        return config;
    } else {
        /**
         * 带参数的修饰
         */
        return (target: any, key?: string) => {
            target.prototype.props = config;
        };
    }
}

/**
 * 自动注入类
 * @param target classes(主类)
 * @param key prototype(键)
 */
export function autowired(target: any, key: string) {
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
        let instance = new params(props);
        if (params._extends && isFunction(params._extends)) {
            if (
                params._extends() === PYIAutoConfiguration ||
                params._extends() === PYIAutoAppConfiguration
            ) {
                instance = instance._runtime(PYIArgs.reflact().config);
            }
        }
        target.constructor.prototype[key] = instance;
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
}
