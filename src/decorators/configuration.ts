import { isFunction } from 'lodash';
import { PYIBase, RuntimeAutoChange } from '../core/pyi.base';
import { PYIAutoAppConfiguration, AppConfigOption } from '../config';
import { PYIArgs } from '../lib';

/**
 * Component base
 */
export abstract class PYIAutoConfiguration<Props> extends PYIBase implements RuntimeAutoChange {
    [x: string]: any;
    public static _pyi: () => any;
    public static _extends() {
        return PYIAutoConfiguration;
    }

    public props?: Props;

    constructor(...props: any) { super(); }

    public _runtime(config: AppConfigOption) {
        const current: string = config.mode;
        if (!this[current]) {
            if (!this.default) {
                throw Error('configuration not use mode and not have default .');
            }
            return this.default;
        }
        return this[current];
    }
}

/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
export function Configuration<Props = any>(config: Props): any {
    const { _extends } = (config as any);
    /**
     * 如果是直接修饰类
     */
    if (_extends && isFunction(_extends)) {
        if (
            _extends() === PYIAutoConfiguration ||
            _extends() === PYIAutoAppConfiguration
        ) {
            return config;
        } else {
            /**
             * 带参数的修饰
             */
            return (target: any, key?: string) => {
                target.prototype.props = config;
            };
        }
    } else {
        return config;
    }
}
