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
        await Promise.all(map(this.comps, async (comp: any) => {
            const { _base } = await comp;
            if (!config.controllers) { config.controllers = []; }
            if (!config.interceptors) { config.interceptors = []; }
            if (!config.middlewares) { config.middlewares = []; }

            if (_base && _base() === PYIController) { config.controllers.push(comp); }
            if (_base && _base() === PYIInterceptor) {
                config.interceptors = await this.order(config.interceptors, comp);
            }
            if (_base && _base() === PYIMiddleware) {
                config.middlewares = await this.order(config.middlewares, comp);
            }
            return await comp;
        }));
        return await config;
    }

    private async order(packs: any[], comp: any) {
        const { props } = await comp;
        if (props.before) {
            const idx = packs.indexOf(props.before);
            if (idx !== -1) {
                packs = packs.slice(0, idx).concat(
                    [comp]
                ).concat(
                    packs.slice(idx, packs.length)
                );
            } else {
                packs.push(comp);
            }
        } else {
            packs.push(comp);
        }
        return await packs;
    }
}
