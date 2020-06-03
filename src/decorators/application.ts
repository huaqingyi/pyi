import { PYICore, PYICoreClass, PYIApp } from '../core/pyi';
import { isFunction, map, find } from 'lodash';
import { dirname, join } from 'path';
import chokidar from 'chokidar';
import { FactoryComponent } from '../factory';
import { PYIController } from './controller';
import { bgWhite, red, gray } from 'colors';
import { get } from 'node-emoji';
import { PYIAppConfiguration } from './configuration';
import { statSync } from 'fs';
import Koa from 'koa';

// tslint:disable-next-line: no-namespace
declare namespace global {
    let pyi: PYIApplication;
}

export const pyi: PYIApplication = new Proxy({} as PYIApplication, {
    get(target, prototype: string) {
        return (global.pyi || {})[prototype];
    },
    set(target, prototype: string, mode) {
        (global.pyi || {})[prototype] = mode;
        return true;
    }
});

export class PYIApplication extends Koa implements PYIApp {
    [x: string]: any;
    public static __proto__: any;
    public static _i: PYIApplication;

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base() {
        return PYIApplication;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _singleton(...props: any) {
        if (!this._i) {
            this._i = new this();
        }
        return this._i;
    }

    public comps: PYIApp[];
    public config: PYIAppConfiguration;
    public readonly path!: string;
    public readonly appSource!: string;

    private source!: string | string[];
    private diresource: string[];

    constructor() {
        super();

        if (!global.pyi) {
            global.pyi = this;
        }

        if (!this.source) { this.source = '.'; }
        this.diresource = [];
        this.comps = [];
        this.config = new PYIAppConfiguration();
        this.mode = 'development';
        if (process.env.NODE_ENV) { this.mode = process.env.NODE_ENV; }
    }

    public _input(...props: any): PYIApp | Promise<PYIApp> {
        return this;
    }

    public _output(...props: any): PYIApp | Promise<PYIApp> {
        return Promise.resolve(this[this.mode]).then(async (action) => {
            // tslint:disable-next-line: no-unused-expression
            action && await action.apply(this);
            return await this;
        });
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
            await Promise.all(map(comp.prototype, async (prototype) => {
                if (prototype && prototype._base && prototype._base() === FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
                return await prototype;
            }));

            if (_base && _base() === PYIController) { this.config.controllers.push(comp); }
            return await comp;
        }));

        await this.factoryComponent(factorys);
        return await this.config;
    }

    public async factoryComponent(factorys: FactoryComponent[]) {
        const fs: FactoryComponent[] = [];
        await Promise.all(map(factorys, async (factory) => {
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
        await Promise.all(map(comp, async (o) => {
            if (!o || !o.prototype) { return await o; }
            o.prototype.mode = await this.mode;
            o.path = path;
            const { _base } = await o;
            if (_base && _base() === PYIAppConfiguration) {
                this.config = await o._singleton()._output();
                if (!this.config.controllers) { this.config.controllers = []; }
            }
            await this.comps.push(o);
            return await o;
        }));
        console.log(`${get('kiss')}  ${gray(`ready ${path} has been added ...`)}`);
        return await this.comps;
    }

    public setResource(source: string | string[]) {
        this.source = source;
    }

    public setDIResource(diresource: string[]) {
        this.diresource = diresource;
    }

    public async create() {
        console.log('create ...');
        await new Promise((r) => chokidar.watch(this.source as any, {
            ignored: (src: string) => {
                const isCompile = /[^\.d]\.(ts|js|tsx|jsx)$/gi.test(src);
                return statSync(src).isFile() && (!isCompile) && src !== this.appSource;
            }
        }).on('add', (path) => {
            this.diresource.push(path);
        }).on('ready', r));
        return this;
    }

    public async bootstrap() {
        console.log('bootstrap ...');
        await Promise.all(map(this.diresource, async (path) => {
            return await this.addFile(path);
        }));
        await this.configrationInit();
    }
}

export function PYIBootstrap<V extends PYICoreClass<PYIApplication>>(props: V): V;
export function PYIBootstrap<Props = { source: string; appSource: string; }>(
    setting: Props
): <V extends PYICoreClass<PYIApplication>>(props: V) => V;
export function PYIBootstrap(props: any) {
    const base = props && props._base && isFunction(props._base) && props._base();
    if (base === PYIApplication) {
        props.prototype.source = dirname(process.argv[1]);
        props.prototype.appSource = process.argv[1];
        return props;
    }

    return (target: PYICoreClass<PYIApplication>) => {
        target.prototype.source = props.source;
        target.prototype.source = props.appSource;
        return target;
    };
}
