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
require("reflect-metadata");
const gulp_1 = require("gulp");
const path_1 = require("path");
const gulp_typescript_1 = require("gulp-typescript");
const gulp_babel_1 = __importDefault(require("gulp-babel"));
const node_emoji_1 = require("node-emoji");
const colors_1 = require("colors");
const readable_stream_1 = require("readable-stream");
const lodash_1 = require("lodash");
const decorators_1 = require("../decorators");
const factory_1 = require("../factory");
class PYIBuilder {
    constructor(app, srcpath, destpath) {
        this.app = app;
        this.srcpath = srcpath;
        this.destpath = destpath;
        this.comps = [];
        this.mode = 'development';
        if (process.env.NODE_ENV) {
            this.mode = process.env.NODE_ENV;
        }
        this.config = new decorators_1.PYIAppConfiguration();
    }
    async build() {
        await gulp_1.src(this.srcpath)
            .pipe(gulp_typescript_1.createProject(path_1.join(process.cwd(), 'tsconfig.json'))())
            .pipe(gulp_babel_1.default())
            .pipe(gulp_1.dest((file) => {
            const output = path_1.join(this.destpath, file.relative.replace(new RegExp(`${file.stem}${file.extname}$`, 'gi'), ''));
            const path = path_1.join(output, `${file.stem}${file.extname}`);
            console.log(`${node_emoji_1.get('kiss')}  ${colors_1.green(`${path}`)}`);
            if (require.cache[path]) {
                delete require.cache[path];
            }
            return output;
        }))
            .pipe(new readable_stream_1.Transform({
            objectMode: true,
            transform: async (file, enc, callback) => {
                await this.addFile(file.path).then(async (comps) => {
                    return await comps;
                });
                return await callback();
            }
        }))
            .pipe(new readable_stream_1.Transform({
            objectMode: true,
            transform: async (file, enc, callback) => {
                await this.configrationInit();
                console.log(this.config);
                return await callback();
            }
        }));
    }
    async configrationInit() {
        const factorys = [];
        await Promise.all(lodash_1.map(this.comps, async (comp, i) => {
            const { _base } = await comp;
            if (comp && comp.prototype) {
                comp.prototype.logger = this.app.logger;
            }
            lodash_1.map(comp.prototype, (prototype) => {
                if (prototype._base && prototype._base() === factory_1.FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
            });
            if (!this.config.controllers) {
                this.config.controllers = [];
            }
            if (!this.config.interceptors) {
                this.config.interceptors = [];
            }
            if (!this.config.middlewares) {
                this.config.middlewares = [];
            }
            if (!this.config.plugins) {
                this.config.plugins = [];
            }
            if (_base && _base() === decorators_1.PYIController) {
                this.config.controllers.push(comp);
            }
            if (_base && _base() === decorators_1.PYIInterceptor) {
                this.config.interceptors.push(comp);
            }
            if (_base && _base() === decorators_1.PYIMiddleware) {
                this.config.middlewares.push(comp);
            }
            if (_base && _base() === decorators_1.PYIPlugin) {
                this.config.plugins.push(comp);
            }
            return await comp;
        }));
        await this.factoryComponent(factorys);
        this.config.plugins = this.config.plugins.sort((p1, p2) => {
            const i1 = (p1.prototype.props || { priority: 0 }).priority || 0;
            const i2 = (p2.prototype.props || { priority: 0 }).priority || 0;
            return i2 - i1;
        });
        return await this.config;
    }
    async factoryComponent(factorys) {
        const fs = [];
        await Promise.all(lodash_1.map(factorys, async (factory) => {
            if (lodash_1.find(factorys, (f) => f.target === factory.component)) {
                await fs.push(factory);
            }
            else {
                await factory._output();
            }
            return factory;
        }));
        if (fs.length > 0) {
            await this.factoryComponent(fs);
        }
        return await factorys;
    }
    async addFile(path) {
        let comp = {};
        try {
            comp = await Promise.resolve().then(() => __importStar(require(path)));
            // tslint:disable-next-line:no-empty
        }
        catch (err) {
            console.log(colors_1.bgWhite(`${node_emoji_1.get('no_entry')}  ${colors_1.red(err)}`));
        }
        if (!comp) {
            return false;
        }
        const comps = await Promise.all(lodash_1.map(comp, async (o, i) => {
            if (!comp[i] || !comp[i].prototype) {
                return await o;
            }
            comp[i].prototype.mode = await this.mode;
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path
                });
            }
            else {
                comp[i]._pyi = () => ({ path });
            }
            const { _base } = await comp[i];
            if (_base && _base() === decorators_1.PYIAppConfiguration) {
                this.config = await comp[i]._pyiconnect()._pyiruntime();
            }
            await this.comps.push(o);
            return await o;
        }));
        console.log(`${node_emoji_1.get('kiss')}  ${colors_1.gray(`ready ${path} has been added ...`)}`);
        return await comps;
    }
}
exports.PYIBuilder = PYIBuilder;

//# sourceMappingURL=../sourcemaps/cli/pyi.builder.js.map
