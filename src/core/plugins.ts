import { PYICore, PYICoreClass } from './pyi';
import { PYIApplication } from '../decorators';
import { Context } from 'koa';

export interface PYIPluginsInstall {
    install: (ctx: Context, next: (...args: any) => any) => any;
}

export class PYIPlugins extends PYICore implements PYIPluginsInstall {
    public static _base() {
        return PYIPlugins;
    }

    protected drive: PYIApplication;

    constructor(drive: PYIApplication<any, any>) {
        super();
        this.drive = drive;
    }

    public async init() {
        return await this.drive.use(this.install);
    }

    public install(ctx: Context, next: (...args: any) => any) {
        return next();
    }
}
