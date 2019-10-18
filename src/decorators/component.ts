import { isFunction } from 'lodash';
import { PYICore } from '../core';
import { PYIAutoConfiguration, PYIAutoAppConfiguration } from './configuration';

/**
 * Component base
 */
export abstract class PYIComponent<Props = {}> extends PYICore {
    public static _root() {
        return PYIComponent;
    }

    public props!: Props;

    constructor(...props: any) { super(); }
}

export function Component<Props = any>(config: Props): any {
    const { _root } = (config as any);
    /**
     * 如果是直接修饰类
     */
    if (_root && isFunction(_root) && _root() === PYIComponent) {
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
        target.constructor.prototype[key] = instance;
        if (params._root && isFunction(params._root)) {
            if (
                params._root() === PYIAutoConfiguration ||
                params._root() === PYIAutoAppConfiguration
            ) {
                (async () => {
                    instance = await instance._runtime();
                    target.constructor.prototype[key] = await instance;
                })();
            }
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
}
