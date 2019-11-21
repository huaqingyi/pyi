/// <reference types="node" />
import { PYICore } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIDto } from './dto';
import { SetOption } from 'cookies';
import { stores } from 'koa-session';
import { Context } from 'vm';
import { Session } from 'inspector';
import Keygrip from 'keygrip';
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
export interface PYIApplicationConfiguration extends RoutingControllersOptions {
    [x: string]: any;
    enableDto?: boolean;
    globalDto?: PYIDto;
    session?: SessionOption;
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
    constructor();
    _runtime(): Promise<this>;
}
export declare function Configuration<Props = any>(config: Props): any;
