import { isFunction } from 'lodash';
import { PYICore } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIDto, PYIGDto } from './dto';
import { SetOption } from 'cookies';
import { stores } from 'koa-session';
import { Context } from 'vm';
import { Session } from 'inspector';
import Keygrip from 'keygrip';
import { Options } from 'koa-jwt';
import { SignOptions, Secret } from 'jsonwebtoken';

// tslint:disable-next-line:no-empty-interface
export interface SessionOption extends Omit<SetOption, 'maxAge'> {
    keys?: Keygrip | string[];
    key: string;
    maxAge?: number | 'session';
    encode?: (obj: object) => string;
    decode?: (str: string) => object;
    genid?: () => string;
    rolling?: boolean;
    renew?: boolean;
    store?: stores;
    ContextStore?: new (ctx: Context) => stores;
    prefix?: string;
    valid?(ctx: Context, session: Partial<Session>): void;
    beforeSave?(ctx: Context, session: Session): void;
}

export interface JWTOptions {
    secret: Secret;
    path: RegExp[];
    token?: SignOptions;
    key?: string;
    tokenKey?: string;
    passthrough?: boolean;
    cookie?: string;
    debug?: boolean;
    audience?: string | string[];
    issuer?: string;
    algorithms?: string[];
    errno?: number;
    errmsg?: string;
    getToken?(ctx: Context, opts: Options): string;
    isRevoked?(ctx: Context, decodedToken: object, token: string): Promise<boolean>;
}

export interface PYIApplicationConfiguration extends RoutingControllersOptions {
    [x: string]: any;
    enableDto?: boolean;
    globalDto?: PYIDto;
    session?: SessionOption;
    jwt?: JWTOptions;
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
    public session: SessionOption;
    public jwt?: JWTOptions;
    constructor() {
        super();
        this.enableDto = true;
        this.defaultErrorHandler = false;
        this.globalDto = PYIGDto;
        this.session = {
            key: 'pyi:session',
            maxAge: 60 * 60 * 24 * 1000
        };
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
