import { PYICore } from './pyi';
import { PYIApplication } from '../decorators';
import { Context } from 'koa';
export interface PYIPluginsInstall {
    install: (ctx: Context, next: (...args: any) => any) => any;
}
export interface PYIPluginsAppInstall {
    init: () => any;
}
export declare class PYIPlugins extends PYICore implements PYIPluginsInstall, PYIPluginsAppInstall {
    static _base(): typeof PYIPlugins;
    protected app: PYIApplication<any, any>;
    constructor(app: PYIApplication<any, any>);
    install(ctx: Context, next: (...args: any) => any): any;
    init(): any;
}
