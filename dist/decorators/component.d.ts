import { PYIBase } from '../core/pyi.base';
/**
 * Component base
 */
export declare abstract class PYIComponent<Props> extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIComponent;
    props?: Props;
    constructor(...props: any);
}
/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
export declare function Component<Props = any>(config: Props): any;
/**
 * 自动注入类
 * @param target classes(主类)
 * @param key prototype(键)
 */
export declare function autowired(target: any, key: string): void;
