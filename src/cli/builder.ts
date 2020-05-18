import { PYICore } from './../core/pyi';
import 'reflect-metadata';
import { src, dest, series } from 'gulp';
import { join } from 'path';
import { createProject, Settings } from 'gulp-typescript';
import babel from 'gulp-babel';
import { get } from 'node-emoji';
import { bgWhite, red, gray, green, yellow } from 'colors';
import { PYIApplication } from './application';
import { PYIApp } from '../core/pyi';
import { map, find } from 'lodash';
import { FactoryComponent } from '../factory';
import { PYIConfiguration, PYIAppConfiguration, PYIController } from '../decorators';
import * as sourcemaps from 'gulp-sourcemaps';
import merge from 'merge2';

export class PYIBuilder {
    public comps: PYIApp[];
    public config: PYIConfiguration;
    public outputs: string[];

    constructor(
        private setting: Settings,
        private app: PYIApplication<any, any>,
        private mode: string,
        private srcpath: string,
        private destpath: string,
    ) {
        this.comps = [];
        this.config = new PYIAppConfiguration();
        this.outputs = [];
    }

    public compile() {
        let tsResult: any = src([
            join(this.srcpath, '**/*.ts'),
            join(this.srcpath, '**/*.tsx'),
            join(this.srcpath, '**/*.js'),
            join(this.srcpath, '**/*.jsx'),
        ]);

        if (this.setting.sourceMap === true) {
            tsResult = tsResult.pipe(sourcemaps.init());
        }

        tsResult = tsResult.pipe(createProject(this.setting)());

        const ms = [];
        if (this.setting.declaration === true) { ms.push(tsResult.dts.pipe(dest(this.destpath))); }

        let js = tsResult.js;
        if (this.setting.sourceMap === true) {
            js = js.pipe(sourcemaps.write('./sourcemaps'));
        }

        ms.push(js.pipe(dest((file) => {
            const output = join(this.destpath, file.relative.replace(
                new RegExp(`${file.stem}${file.extname}$`, 'gi'), ''
            ));
            const path = join(output, `${file.stem}${file.extname}`);
            if (require.cache[path]) {
                delete require.cache[path];
            }
            console.log(`${get('kiss')}  ${green(`${path}`)}`);
            this.outputs.push(path);
            return this.destpath;
        })));
        /**
         * merge result
         */
        return merge(ms);
    }

    public async build() {
        await new Promise((r) => {
            series(this.compile.bind(this), r)((err) => {
                console.log(red(err));
            });
        });

        console.log('build success ...');
        await Promise.all(map(this.outputs, async (path) => {
            return await this.addFile(path).then(async (comps) => {
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

            /**
             * search components have @autoconnect | @autowired prototype
             */
            map(comp.prototype, (prototype) => {
                if (prototype._base && prototype._base() === FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
            });

            if (_base && _base() === PYIController) { this.config.controllers.push(comp); }
            return await comp;
        }));

        await this.factoryComponent(factorys);
        return await this.config;
    }

    public async factoryComponent(factorys: FactoryComponent[]) {
        const fs: FactoryComponent[] = [];
        await Promise.all(map(factorys, async (factory) => {
            map(factory.component.prototype, ({ _base }) => {
                console.log(factory.component.prototype, _base && _base());
            });
            if (find(factorys, ({ target }) => {
                return target === factory.component;
            })) {
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
            comp[i].path = path;
            const { _base } = await comp[i];
            if (_base && _base() === PYIAppConfiguration) {
                this.config = await (comp[i] as any)._singleton()._output();
                if (!this.config.controllers) { this.config.controllers = []; }
            }
            await this.comps.push(o);
            return await o;
        }));
        console.log(`${get('kiss')}  ${gray(`ready ${path} has been added ...`)}`);
        return await comps;
    }
}