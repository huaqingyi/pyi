import chokidar, { FSWatcher } from 'chokidar';
import { blue, magenta, green } from 'colors';
import { map, extend } from 'lodash';
import { AppConfigOption, PYIAutoAppConfiguration } from '../core';
import { createKoaServer, PYIController, PYIMiddleware, PYIInterceptor } from '../decorators';
import { Server, createServer } from 'http';
import bodyParser from 'koa-bodyparser';
import { join } from 'path';
import { PYIArgs } from './pyi.args';

export class PYIChokidar {
    public static runtime(dirname: string, application: any) {
        return new PYIChokidar(dirname, application, PYIArgs.reflact().config);
    }

    private dirname: string;
    private config: AppConfigOption;
    private watcher: FSWatcher;
    private files: { [x: string]: any };
    private app!: Server;
    private port: number;
    private application: any;

    constructor(dirname: string, application: any, config: AppConfigOption) {
        this.dirname = dirname;
        this.config = config;
        this.port = config.server.port || 4003;
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
            if (!comp[i]._extends) { return comp[i]; }
            if (comp[i]._extends() === PYIAutoAppConfiguration) {
                const Setting = comp[i];
                const { props } = comp[i].prototype;
                const config = (new Setting(this.config, props))._runtime(this.config);
                if (!config.entry) { delete config.entry; }
                if (!config.output) { delete config.output; }
                if (
                    process.argv.indexOf('-p') !== -1 ||
                    process.argv.indexOf('--port') !== -1 ||
                    process.argv.indexOf('--p') !== -1
                ) {
                    console.log(green(`listen use command port: ${this.config.server.port}`));
                    delete config.port;
                }
                this.config = extend(this.config, config);
                this.port = this.config.server.port || 4003;
                PYIArgs.reset(this.config);
            }
        });
        this.files[path] = comp;
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
        });

        const app = createKoaServer({
            ...this.config.pyi,
            controllers,
            middlewares,
            interceptors
        });

        app.use(bodyParser());

        let host = 'localhost';

        if (this.config.server) {
            host = this.config.server.host || 'localhost';
        }

        try {
            this.app = await createServer(app.callback()).listen(this.port);
        } catch (err) {
            ++this.port;
            await this.loadApplication();
        }
        console.log(magenta(`Hello Starter PYI Server: Listen on http://${host}:${this.port}`));
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
