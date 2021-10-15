/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';
import { Service } from 'typedi';
import { Container, Inject } from 'typedi';

export const PROPERTIES = Symbol('PROPERTIES');

export function Configuration(target: any): void;
export function Configuration<Props = any>(props: Props): (target: any) => void;
export function Configuration<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYIConfiguration) {
        return Service()(target);
    } else {
        return (target: PYICoreClass<PYICore>) => {
            return Service()(target);
        };
    }
}

export class PYIConfiguration extends PYICore {

    public static _base() {
        return PYIConfiguration;
    }
}

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export interface ConfigurationProperties {
    [x: string]: any;
    APP_AUOTLOAD: string[];
    APP_RUNTIME: string;
    PORT: number;
    HOST: string;
    mode: string;
}

export function properties(target: any, key: string);
export function properties(key: string): (target: any, key: string) => void;
export function properties() {
    if (arguments.length > 1) {
        Inject(PROPERTIES.toString())(...arguments);
    }
    return (target: any, key: string) => {
        Inject(arguments[0])(target, key);
    }
}
