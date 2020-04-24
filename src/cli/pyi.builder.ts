import 'reflect-metadata';
import { src, dest, watch } from 'gulp';
import { join } from 'path';
import { createProject } from 'gulp-typescript';
import babel from 'gulp-babel';
import { get } from 'node-emoji';
import { blue, bgWhite, red, gray, green } from 'colors';
import { Transform } from 'readable-stream';
import chokidar from 'chokidar';
import { PYIApplication } from './application';
import { PYIApp } from '../core/pyi';
import { map, find, difference } from 'lodash';
import { PYIAppConfiguration, PYIController, PYIInterceptor, PYIMiddleware, PYIPlugin } from '../decorators';
import { FactoryComponent } from '../factory';

export class PYIBuilder {
    public comps: PYIApp[];
    public mode: string;
    public config: PYIAppConfiguration;
    public builded: string[];

    constructor(
        private app: PYIApplication<any, any>,
        private srcpath: string[],
        private destpath: string,
    ) {
        this.comps = [];
        this.mode = 'development';
        if (process.env.NODE_ENV) { this.mode = process.env.NODE_ENV; }
        this.config = new PYIAppConfiguration();
        this.builded = [];
    }

    public async build() {
        await new Promise((r) => src(this.srcpath).pipe(createProject(
            join(process.cwd(), 'tsconfig.json')
        )()).pipe(babel()).pipe(dest((file) => {
            const output = join(this.destpath, file.relative.replace(
                new RegExp(`${file.stem}${file.extname}$`, 'gi'), ''
            ));
            const path = join(output, `${file.stem}${file.extname}`);
            if (require.cache[path]) {
                delete require.cache[path];
            }
            console.log(`${get('kiss')}  ${green(`${path}`)}`);
            this.builded.push(path);
            return this.destpath;
        })).pipe(new Transform({
            objectMode: true,
            transform: async (file, enc, callback) => {
                return r(await callback());
            }
        })));

        await Promise.all(map(this.builded, async (path) => {
            await this.addFile(path).then(async (comps) => {
                return await comps;
            });
        }));

        await this.configrationInit();
        console.log(this.config);
    }

    /**
     * import files components
     */
    public async configrationInit() {
        const factorys: FactoryComponent[] = [];
        await Promise.all(map(this.comps, async (comp: any, i: number) => {
            const { _base } = await comp;
            // add logger
            if (comp && comp.prototype) {
                comp.prototype.logger = this.app.logger;
            }

            /**
             * search components have @autoconnect | @autowired prototype
             */
            map(comp.prototype, (prototype) => {
                if (prototype._base && prototype._base() === FactoryComponent) {
                    console.log(2222, prototype, comp);
                    prototype._input(comp);
                    factorys.push(prototype);
                }
            });

            if (_base && _base() === PYIController) { this.config.controllers.push(comp); }
            if (_base && _base() === PYIInterceptor) { this.config.interceptors.push(comp); }
            if (_base && _base() === PYIMiddleware) { this.config.middlewares.push(comp); }
            if (_base && _base() === PYIPlugin) { this.config.plugins.push(comp); }
            return await comp;
        }));

        await this.factoryComponent(factorys);

        this.config.plugins = this.config.plugins.sort(
            (p1, p2) => {
                const i1 = (p1.prototype.props || { priority: 0 }).priority || 0;
                const i2 = (p2.prototype.props || { priority: 0 }).priority || 0;
                return i2 - i1;
            }
        );
        return await this.config;
    }

    public async factoryComponent(factorys: FactoryComponent[]) {
        const fs: FactoryComponent[] = [];
        await Promise.all(map(factorys, async (factory) => {
            console.log(3333, factory);
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

    public async addFile(path: string) {
        let comp: any = {};
        try {
            comp = await import(path);
            // tslint:disable-next-line:no-empty
        } catch (err) {
            console.log(bgWhite(`${get('no_entry')}  ${red(err)}`));
        }

        if (!comp) { return false; }
        const comps = await Promise.all(map(comp, async (o, i) => {
            if (!comp[i] || !comp[i].prototype) { return await o; }
            comp[i].prototype.mode = await this.mode;
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path
                });
            } else {
                comp[i]._pyi = () => ({ path });
            }
            const { _base } = await comp[i];
            if (_base && _base() === PYIAppConfiguration) {
                this.config = await (comp[i] as any)._pyiconnect()._pyiruntime();
                if (!this.config.controllers) { this.config.controllers = []; }
                if (!this.config.interceptors) { this.config.interceptors = []; }
                if (!this.config.middlewares) { this.config.middlewares = []; }
                if (!this.config.plugins) { this.config.plugins = []; }
            }
            await this.comps.push(o);
            return await o;
        }));
        console.log(`${get('kiss')}  ${gray(`ready ${path} has been added ...`)}`);
        return await comps;
    }
}
