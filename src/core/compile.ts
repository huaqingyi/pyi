import {
    PYIApplication, PYIAppConfiguration, PYIController,
    PYIInterceptor, PYIMiddleware, AppSwaggerJSON, getMetadataArgsStorage, RequestMappingMethod
} from '../decorators';
import { PYIChokidar } from '../libs/chokidar';
import { PYIApp, PYICoreClass } from './pyi';
import { map, find } from 'lodash';
import { PYIPlugin } from '../decorators/plugins';
import { FactoryComponent } from '../factory';
import { Swagger, tags, request, summary, security, description, body } from '../libs/swagger';

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

    public async factoryComponent(factorys: FactoryComponent[]) {
        const fs: FactoryComponent[] = [];
        await Promise.all(map(factorys, async (factory) => {
            if (find(factorys, (f) => f.target === factory.component)) {
                await fs.push(factory);
            } else {
                await factory._output();
            }
            return factory;
        }));
        if (fs.length > 0) { await this.factoryComponent(fs); }
        return await factorys;
    }

    public async configrationInit(config: PYIAppConfiguration) {
        const factorys: FactoryComponent[] = [];
        await Promise.all(map(this.comps, async (comp: any, i: number) => {
            const { _base } = await comp;
            if (comp && comp.prototype) {
                comp.prototype.logger = this.drive.logger;
            }
            map(comp.prototype, (prototype) => {
                if (prototype._base && prototype._base() === FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
            });
            if (!config.controllers) { config.controllers = []; }
            if (!config.interceptors) { config.interceptors = []; }
            if (!config.middlewares) { config.middlewares = []; }
            if (!config.plugins) { config.plugins = []; }

            if (_base && _base() === PYIController) { config.controllers.push(comp); }
            if (_base && _base() === PYIInterceptor) { config.interceptors.push(comp); }
            if (_base && _base() === PYIMiddleware) { config.middlewares.push(comp); }
            if (_base && _base() === PYIPlugin) { config.plugins.push(comp); }
            return await comp;
        }));

        await this.factoryComponent(factorys);

        config.plugins = config.plugins.sort(
            (p1, p2) => {
                const i1 = (p1.prototype.props || { priority: 0 }).priority || 0;
                const i2 = (p2.prototype.props || { priority: 0 }).priority || 0;
                return i2 - i1;
            }
        );
        return await config;
    }

    public async installPlugins(plugins: Array<PYICoreClass<PYIPlugin>>) {
        // tslint:disable-next-line:no-empty
        const isPlugins: (plugins: PYICoreClass<PYIPlugin>) => any = this.drive.onPluginApplication || (() => { });

        return Promise.all(map(plugins, async (plugin) => {
            // tslint:disable-next-line:no-unused-expression
            if (await isPlugins(plugin) !== false) {
                const install = new plugin(this.drive);
                await install.init();
            }
            return await plugin;
        }));
    }

    public async useSwaggerAction(config: AppSwaggerJSON | false) {
        if (config !== false) {
            const { controllers, actions } = getMetadataArgsStorage();
            await Promise.all(map(actions, async (data) => {
                const { target, method, route, type, docs } = data as any;

                // tslint:disable-next-line:no-shadowed-variable
                const control = find(controllers, (control) => control.target === target);
                // tslint:disable-next-line:no-shadowed-variable
                let path: string | RegExp = route;
                if (control && control.route) {
                    path = `/${control.route}/${route}`.split('//').join('/');
                }

                const tag = tags([target.name]);
                tag(target, method, {
                    value: { method: type, path }
                });
                // tslint:disable-next-line:no-unused-expression
                request(type, path)(target, method, {
                    value: { method: type, path }
                });
                
                if (docs.summary) {
                    summary(docs.summary)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.security) {
                    security(docs.security)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.description) {
                    description(docs.description)(target, method, {
                        value: { method: type, path }
                    });
                }
                if (docs.swaggerDocument) {
                    body(docs.swaggerDocument)(target, method, {
                        value: { method: type, path }
                    });
                }
                return await data;
            }));
            const swaggerConf: AppSwaggerJSON = config;
            const path: string = swaggerConf.path;
            delete swaggerConf.path;
            return await Swagger.build(path, this.drive, swaggerConf);
        }
        return config;
    }
}
