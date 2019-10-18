"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const libs_1 = require("../libs");
const colors_1 = require("colors");
const routing_controllers_1 = require("routing-controllers");
class PYIApplication extends core_1.Application {
    static _root() {
        return PYIApplication;
    }
    async run(path) {
        const { onInit, didLoad, onInitComponent, didInitComponent, didMakeConfig } = this;
        await console.log(colors_1.green(`start load project files ...`));
        // tslint:disable-next-line:no-unused-expression
        onInit && await onInit.apply(this);
        const chokidar = await libs_1.PYIChokidar.runtime(path, this.mode).setup();
        await console.log(colors_1.green(`load end project files success ...`));
        // tslint:disable-next-line:no-unused-expression
        didLoad && await didLoad.apply(this);
        const comps = await chokidar.comps;
        const config = await chokidar.appconfig;
        this.config = config;
        await console.log(colors_1.green(`will load app to all components and config ...`));
        // tslint:disable-next-line:no-unused-expression
        onInitComponent && await onInitComponent.apply(this);
        await comps.forEach((comp) => {
            const { _root } = comp;
            if (_root && _root() === PYIApplication) {
                return comp;
            }
            comp.prototype.app = this;
        });
        await console.log(colors_1.green(`did load app to all components success ...`));
        // tslint:disable-next-line:no-unused-expression
        didInitComponent && await didInitComponent.apply(this);
        await libs_1.Maker.runtime(this).setup(comps);
        await console.log(colors_1.green(`make components to app config success ...`));
        // tslint:disable-next-line:no-unused-expression
        didMakeConfig && await didMakeConfig.apply(this);
        this.config.controllers = (this.config.controllers || []).concat(this.controllers);
        this.config.middlewares = (this.config.middlewares || []).concat(this.middlewares);
        this.config.interceptors = (this.config.interceptors || []).concat(this.interceptors);
        if (this.config.enableDto === true) {
            this.config.defaultErrorHandler = false;
        }
        const app = routing_controllers_1.useKoaServer(this, {
            ...this.config,
            defaultErrorHandler: false
        });
        this._setup.next(this);
        return app;
    }
}
exports.PYIApplication = PYIApplication;
function PYIBootstrap(target, key) {
    let mode = 'development';
    if (process.env.NODE_ENV) {
        mode = process.env.NODE_ENV;
    }
    target.prototype.mode = mode;
}
exports.PYIBootstrap = PYIBootstrap;

//# sourceMappingURL=../sourcemaps/decorators/pyi.js.map
