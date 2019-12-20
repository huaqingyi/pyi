"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const chokidar_1 = require("../libs/chokidar");
const lodash_1 = require("lodash");
const plugins_1 = require("../decorators/plugins");
const factory_1 = require("../factory");
class Compile {
    constructor(drive) {
        this.drive = drive;
        this.comps = [];
    }
    async scanProject(callback) {
        const chokidar = await chokidar_1.PYIChokidar.runtime(this.drive.mode, callback);
        this.drive.config = chokidar.config;
        this.comps = chokidar.comps;
        return await chokidar;
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
    async configrationInit(config) {
        const factorys = [];
        await Promise.all(lodash_1.map(this.comps, async (comp, i) => {
            const { _base } = await comp;
            if (comp && comp.prototype) {
                comp.prototype.logger = this.drive.logger;
            }
            lodash_1.map(comp.prototype, (prototype) => {
                if (prototype._base && prototype._base() === factory_1.FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
            });
            if (!config.controllers) {
                config.controllers = [];
            }
            if (!config.interceptors) {
                config.interceptors = [];
            }
            if (!config.middlewares) {
                config.middlewares = [];
            }
            if (!config.plugins) {
                config.plugins = [];
            }
            if (_base && _base() === decorators_1.PYIController) {
                config.controllers.push(comp);
            }
            if (_base && _base() === decorators_1.PYIInterceptor) {
                config.interceptors.push(comp);
            }
            if (_base && _base() === decorators_1.PYIMiddleware) {
                config.middlewares.push(comp);
            }
            if (_base && _base() === plugins_1.PYIPlugin) {
                config.plugins.push(comp);
            }
            return await comp;
        }));
        await this.factoryComponent(factorys);
        config.plugins = config.plugins.sort((p1, p2) => {
            const i1 = (p1.prototype.props || { priority: 0 }).priority || 0;
            const i2 = (p2.prototype.props || { priority: 0 }).priority || 0;
            return i2 - i1;
        });
        return await config;
    }
    async installPlugins(plugins) {
        // tslint:disable-next-line:no-empty
        const isPlugins = this.drive.onPluginApplication || (() => { });
        return Promise.all(lodash_1.map(plugins, async (plugin) => {
            // tslint:disable-next-line:no-unused-expression
            if (await isPlugins(plugin) !== false) {
                const install = new plugin(this.drive);
                await install.init();
            }
            return await plugin;
        }));
    }
}
exports.Compile = Compile;

//# sourceMappingURL=../sourcemaps/core/compile.js.map
