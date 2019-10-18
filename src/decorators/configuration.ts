import { isFunction } from 'lodash';
import { PYICore } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIDto, PYIGDto } from './dto';

export interface PYIApplicationConfiguration extends RoutingControllersOptions {
    [x: string]: any;
    enableDto?: boolean;
    globalDto?: PYIDto;
}

/**
 * Component base
 */
export abstract class PYIAutoConfiguration<Props = {}> extends PYICore {
    [x: string]: any;
    public static _pyi: () => any;
    public static _root() {
        return PYIAutoConfiguration;
    }

    public props?: Props;
    public async _runtime() {
        if (this[this.mode]) { await this[this.mode](); }
        return await this;
    }
}

// tslint:disable-next-line:max-classes-per-file
export abstract class PYIAutoAppConfiguration<Props = {}> extends PYICore implements PYIApplicationConfiguration {
    [x: string]: any;
    public static _pyi: () => any;
    public static _root() {
        return PYIAutoAppConfiguration;
    }

    public props?: Props;

    public enableDto: boolean;
    public globalDto: any & PYIDto;
    constructor() {
        super();
        this.enableDto = true;
        this.defaultErrorHandler = false;
        this.globalDto = PYIGDto;
    }

    public async _runtime() {
        if (this[this.mode]) { await this[this.mode](); }
        return await this;
    }
}

export function Configuration<Props = any>(config: Props): any {
    const { _root } = (config as any);
    /**
     * 如果是直接修饰类
     */
    if (_root && isFunction(_root)) {
        if (
            _root() === PYIAutoConfiguration ||
            _root() === PYIAutoAppConfiguration
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
