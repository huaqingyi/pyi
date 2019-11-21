import { PYICore } from '../core';
/**
 * Component base
 */
export declare abstract class PYIComponent<Props = {}> extends PYICore {
    static _root(): typeof PYIComponent;
    props: Props;
    constructor(...props: any);
}
export declare function Component<Props = any>(config: Props): any;
/**
 * 自动注入类
 * @param target classes(主类)
 * @param key prototype(键)
 */
export declare function autoconnect(target: any, key: string): void;
/**
 * 自动注入新类
 * @param target classes(主类)
 * @param key prototype(键)
 */
export declare function autowired(target: any, key: string): void;
