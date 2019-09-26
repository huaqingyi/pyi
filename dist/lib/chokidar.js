"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./../helper");
const chokidar_1 = __importDefault(require("chokidar"));
const colors_1 = require("colors");
const lodash_1 = require("lodash");
const config_1 = require("../config");
const decorators_1 = require("../decorators");
const http_1 = require("http");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const path_1 = require("path");
const pyi_args_1 = require("./pyi.args");
const lodash_2 = require("lodash");
class PYIChokidar {
    constructor(dirname, application, config) {
        this.dirname = dirname;
        this.config = config;
        this.config.entry = dirname;
        this.config.output = path_1.join(dirname, 'runtime');
        this.files = {};
        this.watcher = chokidar_1.default.watch(this.dirname);
        this.application = application;
        this.isViewObject = false;
        this.watcher.on('add', this.addFile.bind(this));
        this.watcher.on('ready', this.ready.bind(this));
    }
    static runtime(dirname, application) {
        return new PYIChokidar(dirname, application, pyi_args_1.PYIArgs.reflact().config);
    }
    async authFileExt(path) {
        if (this.config.resolve && this.config.resolve.extensions) {
            const exts = this.config.resolve.extensions.join('|').split('.').join('');
            return await new RegExp(`.(${exts})$`, 'gi').test(path);
        }
        return false;
    }
    async addFile(path) {
        try {
            if (!await this.authFileExt(path)) {
                return false;
            }
            const comp = await Promise.resolve().then(() => __importStar(require(path)));
            if (!comp) {
                return false;
            }
            lodash_1.map(comp, (o, i) => {
                if (!comp[i]) {
                    return o;
                }
                if (comp[i]._pyi) {
                    const _pyi = comp[i]._pyi();
                    comp[i]._pyi = () => ({ ..._pyi, path });
                }
                this.files[`${i}_${path}`] = comp[i];
            });
        }
        catch (err) {
            this.loadFileError = {
                use: new Error('import project file component error .'),
                detail: err
            };
        }
        console.log(colors_1.green(`File ${path} has been added ...`));
    }
    async loadApplication(controllers, middlewares, interceptors) {
        await this.watcher.close();
        helper_1.BeforeMiddleware.prototype.comps = this.files;
        if (this.loadFileError) {
            helper_1.BeforeMiddleware.prototype.error = this.loadFileError;
        }
        helper_1.BeforeMiddleware.prototype.chokider = this;
        middlewares.unshift(helper_1.BeforeMiddleware);
        helper_1.AfterMiddleware.prototype.chokider = this;
        middlewares.push(helper_1.AfterMiddleware);
        const app = decorators_1.createKoaServer({
            ...this.config.pyi,
            development: false,
            defaultErrorHandler: false,
            controllers,
            middlewares,
            interceptors
        });
        app.on('error', async (err, ctx) => {
            if (this.config.pyi.defaultVo) {
                ctx.body = await this.config.pyi.defaultVo({}, err);
            }
            else {
                ctx.body = err;
            }
        });
        app.on('vo', async (isvo, ctx) => {
            this.isViewObject = isvo;
        });
        app.use(koa_bodyparser_1.default());
        let host = 'localhost';
        if (this.config.server) {
            host = this.config.server.host || 'localhost';
        }
        this.app = await http_1.createServer(app.callback()).listen(this.config.server.port, host);
        console.log(colors_1.magenta(`Hello Starter PYI Server: Listen on http://${host}:${this.config.server.port}`));
        return await this.app;
    }
    async ready() {
        const controllers = [];
        const middlewares = [];
        const interceptors = [];
        await Promise.all(lodash_1.map(this.files, async (comp) => {
            if (!comp._extends) {
                return comp;
            }
            if (comp._extends() === decorators_1.PYIController) {
                controllers.push(comp);
            }
            if (comp._extends() === decorators_1.PYIMiddleware) {
                middlewares.push(comp);
            }
            if (comp._extends() === decorators_1.PYIInterceptor) {
                interceptors.push(comp);
            }
            if (comp._extends() === config_1.PYIAutoAppConfiguration) {
                const Setting = comp;
                const { props } = comp.prototype;
                const instance = new Setting(this.config, props);
                lodash_1.map(comp.prototype, (o, i) => {
                    if (lodash_2.isFunction(o)) {
                        instance[i] = o.bind(instance);
                    }
                    else {
                        instance[i] = o;
                    }
                });
                const config = instance._runtime(this.config);
                if (!config.entry) {
                    delete config.entry;
                }
                if (!config.output) {
                    delete config.output;
                }
                this.config = lodash_1.extend(this.config, config);
                this.config = pyi_args_1.PYIArgs.reset(this.config);
                console.log(colors_1.blue(`listen use command port: ${this.config.server.port}`));
            }
            return await comp;
        }));
        await this.application.complete.next({
            starter: this.loadApplication.bind(this, controllers, middlewares, interceptors),
            config: this.config,
            watcher: this.watcher
        });
    }
}
exports.PYIChokidar = PYIChokidar;

//# sourceMappingURL=../sourcemaps/lib/chokidar.js.map
