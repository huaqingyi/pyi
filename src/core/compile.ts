import { PYIApplication, PYIAppConfiguration, PYIController, PYIInterceptor, PYIMiddleware } from '../decorators';
import { PYIChokidar } from '../libs/chokidar';
import { PYIApp } from './pyi';
import { map } from 'lodash';

export class Compile {
    private drive: PYIApplication;
    private comps: PYIApp[];

    constructor(drive: PYIApplication<any, any>) {
        this.drive = drive;
        this.comps = [];
    }

    public async scanProject(callback: (file: PYIApp | PYIApp[]) => any) {
        const chokidar = await PYIChokidar.runtime(this.drive.mode, callback);
        this.drive.config = chokidar.config;
        this.comps = chokidar.comps;
        return await chokidar;
    }

    public async configrationInit(config: PYIAppConfiguration) {
        await Promise.all(map(this.comps, async (comp: any, i: number) => {
            const { _base } = await comp;
            if (comp) {
                comp.prototype.logger = this.drive.logger;
            }
            if (!config.controllers) { config.controllers = []; }
            if (!config.interceptors) { config.interceptors = []; }
            if (!config.middlewares) { config.middlewares = []; }

            if (_base && _base() === PYIController) { config.controllers.push(comp); }
            if (_base && _base() === PYIInterceptor) { config.interceptors.push(comp); }
            if (_base && _base() === PYIMiddleware) { config.middlewares.push(comp); }
            return await comp;
        }));
        return await config;
    }
}
