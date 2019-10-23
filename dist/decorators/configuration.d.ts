/// <reference types="node" />
import { PYICore } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIDto } from './dto';
import { SetOption } from 'cookies';
import { stores } from 'koa-session';
import { Context } from 'vm';
import { Session } from 'inspector';
import Keygrip from 'keygrip';
import { Options } from 'koa-jwt';
import { SignOptions, Secret } from 'jsonwebtoken';
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
export declare abstract class PYIAutoConfiguration<Props = {}> extends PYICore {
    [x: string]: any;
    static _pyi: () => any;
    static _root(): typeof PYIAutoConfiguration;
    props?: Props;
    _runtime(): Promise<this>;
}
export declare abstract class PYIAutoAppConfiguration<Props = {}> extends PYICore implements PYIApplicationConfiguration {
    [x: string]: any;
    static _pyi: () => any;
    static _root(): typeof PYIAutoAppConfiguration;
    props?: Props;
    enableDto: boolean;
    globalDto: any & PYIDto;
    session: SessionOption;
    jwt?: JWTOptions;
    constructor();
    _runtime(): Promise<this>;
}
export declare function Configuration<Props = any>(config: Props): any;
