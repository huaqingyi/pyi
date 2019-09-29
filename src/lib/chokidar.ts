import { AfterMiddleware, BeforeMiddleware } from './../helper';
import chokidar, { FSWatcher } from 'chokidar';
import { blue, magenta, green } from 'colors';
import { map, extend } from 'lodash';
import { AppConfigOption, PYIAutoAppConfiguration } from '../config';
import { createKoaServer, PYIController, PYIMiddleware, PYIInterceptor } from '../decorators';
import { Server, createServer, ServerResponse, IncomingMessage } from 'http';
import bodyParser from 'koa-bodyparser';
import { join } from 'path';
import { PYIArgs } from './pyi.args';
import { isFunction } from 'lodash';
import Koa, { Context } from 'koa';

export class PYIChokidar {
    public static runtime(dirname: string, application: any) {
        return new PYIChokidar(dirname, application, PYIArgs.reflact().config);
    }

    public isViewObject: boolean;
    public config: AppConfigOption;
    private dirname: string;
    private watcher: FSWatcher;
    private files: { [x: string]: any };
    private app!: Server;
    private application: any;
    private loadFileError?: {
        use?: Error,
        detail: Error
    };

    constructor(dirname: string, application: any, config: AppConfigOption) {
        this.dirname = dirname;
        this.config = config;
        this.config.entry = dirname;
        this.config.output = join(dirname, 'runtime');
        this.files = {};
        this.watcher = chokidar.watch(this.dirname, {
            ignored: [/node_modules/, '*.d.ts'],
        });
        this.application = application;
        this.isViewObject = false;

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
        try {
            if (!await this.authFileExt(path)) { return false; }
            const comp = await import(path);
            if (!comp) { return false; }
            map(comp, (o, i) => {
                if (!comp[i]) { return o; }
                if (comp[i]._pyi) {
                    const _pyi = comp[i]._pyi();
                    comp[i]._pyi = () => ({ ..._pyi, path });
                }
                this.files[`${i}_${path}`] = comp[i];
            });
        } catch (err) {
            this.loadFileError = {
                use: new Error('import project file component error .'),
                detail: err
            };
        }
        console.log(green(`File ${path} has been added ...`));
    }

    public async loadApplication(
        controllers: any[],
        middlewares: any[],
        interceptors: any[],
        config?: AppConfigOption
    ) {
        await this.watcher.close();
        if (config) { this.config = config; }

        BeforeMiddleware.prototype.comps = this.files;
        if (this.loadFileError) { BeforeMiddleware.prototype.error = this.loadFileError; }
        BeforeMiddleware.prototype.chokider = this;
        middlewares.unshift(BeforeMiddleware);
        AfterMiddleware.prototype.chokider = this;
        middlewares.push(AfterMiddleware);

        const app: Koa = createKoaServer({
            ...this.config.pyi,
            development: false,
            defaultErrorHandler: false,
            controllers,
            middlewares,
            interceptors
        });

        app.on('error', async (err: any, ctx: Context) => {
            if (this.config.pyi.defaultVo) {
                ctx.body = await this.config.pyi.defaultVo({}, err);
            } else {
                ctx.body = err;
            }
        });

        app.on('vo', async (isvo: boolean, ctx: Context) => {
            this.isViewObject = isvo;
        });

        app.use(bodyParser());

        let host = 'localhost';

        if (this.config.server) {
            host = this.config.server.host || 'localhost';
        }

        this.app = await createServer(app.callback());
        this.app.on('connection', (sock) => {
            // sock.write(Buffer.from('hello'));
            // sock.end();
            // console.log(sock);
            const req = new IncomingMessage(sock);
            const res = new ServerResponse(req);
            res.writeHead(200, {
                'content-type': 'text/plain'
            });
            res.write('hello nodejs');
            console.log(res.statusMessage);
            res.end();
        });
        this.app.listen(this.config.server.port, host);

        console.log(magenta(`Hello Starter PYI Server: Listen on http://${host}:${this.config.server.port}`));
        return await this.app;
    }

    public async ready() {
        const controllers: Function[] = [];
        const middlewares: Function[] = [];
        const interceptors: Function[] = [];
        await Promise.all(map(this.files, async (comp) => {
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
                console.log(blue(`listen use command port: ${this.config.server.port}`));
            }
            return await comp;
        }));

        await this.application.complete.next({
            starter: (config?: AppConfigOption) => {
                return this.loadApplication(controllers, middlewares, interceptors, config);
            },
            config: this.config,
            watcher: this.watcher
        });
    }
}
