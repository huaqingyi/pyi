import { PYIApplication, PYIAppConfiguration, PYIController } from '../decorators';
import { PYIChokidar } from '../libs/chokidar';
import { PYIApp } from './pyi';
import { map } from 'lodash';

export class Compile {
    private drive: PYIApplication;
    private comps: PYIApp[];

    constructor(drive: PYIApplication) {
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
        await Promise.all(map(this.comps, async (comp: any) => {
            const { _base } = await comp;
            if (_base && _base() === PYIController) {
                if (!config.controllers) { config.controllers = []; }
                if (!config.interceptors) { config.interceptors = []; }
                if (!config.middlewares) { config.middlewares = []; }
                config.controllers.push(comp);
                config.interceptors.push(comp);
                config.middlewares.push(comp);
            }
        }));
        return await config;
    }
}
