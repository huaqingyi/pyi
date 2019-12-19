import { PYICore } from './pyi';
import { PYIApplication } from '../decorators';
import { Context } from 'koa';

export interface PYIPluginsInstall {
    install: (ctx: Context, next: (...args: any) => any) => any;
}

export interface PYIPluginsAppInstall {
    init: () => any;
}

export class PYIPlugins extends PYICore implements PYIPluginsInstall, PYIPluginsAppInstall {
    public static _base() {
        return PYIPlugins;
    }

    protected app: PYIApplication<any, any>;

    constructor(app: PYIApplication<any, any>) {
        super();
        this.app = app;
    }

    public install(ctx: Context, next: (...args: any) => any): any {
        return next();
    }

    public init(): any {
        return this.app.use(this.install);
    }
}
