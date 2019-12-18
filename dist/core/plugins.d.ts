import { PYICore } from './pyi';
import { PYIApplication } from '../decorators';
import { Context } from 'koa';
export interface PYIPluginsInstall {
    install: (ctx: Context, next: (...args: any) => any) => any;
}
export declare class PYIPlugins extends PYICore implements PYIPluginsInstall {
    static _base(): typeof PYIPlugins;
    protected drive: PYIApplication;
    constructor(drive: PYIApplication<any, any>);
    init(): Promise<import("koa")<import("koa").DefaultState, import("koa").DefaultContext & Context>>;
    install(ctx: Context, next: (...args: any) => any): any;
}
