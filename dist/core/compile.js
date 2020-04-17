"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../decorators");
const chokidar_1 = require("../libs/chokidar");
const lodash_1 = require("lodash");
const plugins_1 = require("../decorators/plugins");
const factory_1 = require("../factory");
const swagger_1 = require("../libs/swagger");
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
                const { jwt } = config;
                if (jwt !== false) {
                    this.drive.use(async (ctx, next) => {
                        const actions = lodash_1.filter(decorators_1.getMetadataArgsStorage().actions, (a) => {
                            if (a.type.toLocaleUpperCase() === ctx.request.method.toLocaleUpperCase()) {
                                return a.path.test(ctx.request.url);
                            }
                            return false;
                        });
                        // if (!actions || !actions.length) { return servlet.notFound(config.jwtSecretKey, ctx, next); }
                        switch (actions.length) {
                            case 0:
                                return (new jwt()).notFound(config.jwtSecretKey, ctx, next);
                            case 1:
                                const servlet = new Proxy(new jwt(), {
                                    get(target, key) {
                                        if (target[key]) {
                                            return target[key];
                                        }
                                        return actions[0].target.prototype[key];
                                    },
                                    set(target, key, value) {
                                        return target[key] = actions[0].target.prototype[key] = value;
                                    }
                                });
                                const action = actions[0].target.prototype[actions[0].method];
                                console.log(action);
                                return await servlet.use(action, config.jwtSecretKey, ctx, next);
                            default:
                                return await (new jwt()).multiple(actions, config.jwtSecretKey, ctx, next);
                        }
                    });
                }
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
    async useServletAction(config, jwt) {
        if (config !== false) {
            const { controllers, actions } = decorators_1.getMetadataArgsStorage();
            await Promise.all(lodash_1.map(actions, async (data) => {
                const { target, method, route, type, docs } = data;
                // tslint:disable-next-line:no-shadowed-variable
                const control = lodash_1.find(controllers, (control) => control.target === target);
                // tslint:disable-next-line:no-shadowed-variable
                let path = route;
                if (control && control.route) {
                    path = `/${control.route}/${route}`.split('//').join('/');
                }
                const tag = swagger_1.tags([target.name]);
                tag(target, method, {
                    value: { method: type, path }
                });
                // tslint:disable-next-line:no-unused-expression
                swagger_1.request(type, path)(target, method, {
                    value: { method: type, path }
                });
                if (docs.summary) {
                    swagger_1.summary(docs.summary)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.security) {
                    swagger_1.security(docs.security)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.description) {
                    swagger_1.description(docs.description)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.swaggerDocument) {
                    swagger_1.body(docs.swaggerDocument)(target, method, {
                        value: { method: type, path }
                    });
                }
                return await data;
            }));
            const swaggerConf = config;
            const path = swaggerConf.path;
            delete swaggerConf.path;
            return await swagger_1.Swagger.build(path, this.drive, swaggerConf);
        }
        return config;
    }
}
exports.Compile = Compile;

//# sourceMappingURL=../sourcemaps/core/compile.js.map
