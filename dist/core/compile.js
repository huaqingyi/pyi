"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const chokidar_1 = require("../libs/chokidar");
const lodash_1 = require("lodash");
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
    async configrationInit(config) {
        await Promise.all(lodash_1.map(this.comps, async (comp, i) => {
            const { _base } = await comp;
            if (comp) {
                comp.prototype.logger = this.drive.logger;
            }
            if (!config.controllers) {
                config.controllers = [];
            }
            if (!config.interceptors) {
                config.interceptors = [];
            }
            if (!config.middlewares) {
                config.middlewares = [];
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
            return await comp;
        }));
        return await config;
    }
}
exports.Compile = Compile;

//# sourceMappingURL=../sourcemaps/core/compile.js.map
