import chokidar, { FSWatcher } from 'chokidar';
import { blue, magenta, green } from 'colors';
import { map, extend } from 'lodash';
import { AppConfigOption, PYIAutoAppConfiguration } from '../core';
import { createKoaServer, PYIController, PYIMiddleware, PYIInterceptor } from '../decorators';
import { Server, createServer } from 'http';
import bodyParser from 'koa-bodyparser';
import { join } from 'path';
import { PYIArgs } from './pyi.args';
import { isFunction } from 'lodash';

export class PYIChokidar {
    public static runtime(dirname: string, application: any) {
        return new PYIChokidar(dirname, application, PYIArgs.reflact().config);
    }

    private dirname: string;
    private config: AppConfigOption;
    private watcher: FSWatcher;
    private files: { [x: string]: any };
    private app!: Server;
    private application: any;

    constructor(dirname: string, application: any, config: AppConfigOption) {
        this.dirname = dirname;
        this.config = config;
        this.config.entry = dirname;
        this.config.output = join(dirname, 'runtime');
        this.files = {};
        this.watcher = chokidar.watch(this.dirname);
        this.application = application;

        this.watcher.on('add', this.addFile.bind(this));
        this.watcher.on('ready', this.ready.bind(this));
    }

    public async authFileExt(path: string) {
        if (this.config.resolve && this.config.resolve.extensions) {
            const exts = this.config.resolve.extensions.join('|').split('.').join('');
            return await new RegExp(`.(${exts})$`, 'gi').test(path);
        }
        return false;
    }

    public async addFile(path: string) {
        if (!await this.authFileExt(path)) { return false; }
        const comp = await import(path);
        if (!comp) { return false; }
        map(comp, (o, i) => {
            if (!comp[i]) { return o; }
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path,
                    mode: this.config.mode,
                    watch: this.config.watch
                });
            }
            this.files[`${i}_${path}`] = comp[i];
        });
        console.log(blue(`File ${path} has been added ...`));
    }

    public async loadApplication() {
        await this.watcher.close();

        const controllers: Function[] = [];
        const middlewares: Function[] = [];
        const interceptors: Function[] = [];
        map(this.files, (comp) => {
            if (!comp._extends) { return comp; }
            if (comp._extends() === PYIController) { controllers.push(comp); }
            if (comp._extends() === PYIMiddleware) { middlewares.push(comp); }
            if (comp._extends() === PYIInterceptor) { interceptors.push(comp); }
            if (comp._extends() === PYIAutoAppConfiguration) {
                const Setting = comp;
                const { props } = comp.prototype;
                const instance = new Setting(this.config, props);
                map(comp.prototype, (o, i) => {
                    if (isFunction(o)) {
                        instance[i] = o.bind(instance);
                    } else {
                        instance[i] = o;
                    }
                });
                const config = instance._runtime(this.config);
                if (!config.entry) { delete config.entry; }
                if (!config.output) { delete config.output; }
                this.config = extend(this.config, config);
                this.config = PYIArgs.reset(this.config);
                console.log(green(`listen use command port: ${this.config.server.port}`));
            }
        });

        const app = createKoaServer({
            ...this.config.pyi,
            controllers,
            middlewares,
            interceptors
        });

        app.on('error', (err: any) => {
            console.log(err);
        });

        app.use(bodyParser());

        let host = 'localhost';

        if (this.config.server) {
            host = this.config.server.host || 'localhost';
        }

        this.app = await createServer(app.callback()).listen(this.config.server.port, host);

        console.log(magenta(`Hello Starter PYI Server: Listen on http://${host}:${this.config.server.port}`));
        return await this.app;
    }

    public async ready() {
        await this.application.complete.next({
            starter: this.loadApplication.bind(this),
            config: this.config,
            watcher: this.watcher
        });
    }
}
