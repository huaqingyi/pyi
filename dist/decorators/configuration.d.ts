import { PYIBase, RuntimeAutoChange } from '../core/pyi.base';
import { AppConfigOption } from '../core';
/**
 * Component base
 */
export declare abstract class PYIAutoConfiguration<Props> extends PYIBase implements RuntimeAutoChange {
    [x: string]: any;
    static _pyi: () => any;
    static _extends(): typeof PYIAutoConfiguration;
    props?: Props;
    constructor(...props: any);
    _runtime(config: AppConfigOption): any;
}
/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
export declare function Configuration<Props = any>(config: Props): any;
