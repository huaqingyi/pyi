import chokidar, { FSWatcher } from 'chokidar';
import { gray, bgRed, blue, bgCyan, red, bgWhite } from 'colors';
import { map } from 'lodash';
import { dirname } from 'path';
import { PYIAppConfiguration } from '../decorators';
import { PYIApp } from '../core';
import { get } from 'node-emoji';

export class PYIChokidar {
    public static async runtime(mode: string, callback: (file: PYIApp | PYIApp[]) => any) {
        return (new PYIChokidar(mode, callback)).runtime();
    }

    public config!: PYIAppConfiguration;
    public comps: PYIApp[];
    private callback: (file: PYIApp | PYIApp[]) => any;
    private watcher: FSWatcher;
    private appPath: string;
    private projectPath: string;
    private mode: string;
    private fileTrans: { [x: string]: PYIApp | PYIApp[]; };

    constructor(mode: string, callback: (file: PYIApp | PYIApp[]) => any) {
        this.comps = [];
        this.fileTrans = {};
        this.mode = mode;
        this.callback = callback;
        this.appPath = process.argv[1];
        this.projectPath = dirname(this.appPath);
        this.watcher = chokidar.watch([
            `${this.projectPath}/**/*.ts`,
            `${this.projectPath}/**/*.js`,
        ], {
            ignored: (path: string) => {
                return (new RegExp(`${this.appPath}|\.d\.ts|\.js\.map`, 'gi')).test(path);
            }
        });
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
        await Promise.all(map(comp, async (o, i) => {
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
            await this.callback(o);
            await this.comps.push(o);
            return await o;
        }));
        this.fileTrans[path] = comp;
        console.log(`${get('kiss')}  ${gray(`ready ${path} has been added ...`)}`);
    }

    public async runtime(): Promise<PYIChokidar> {
        return new Promise<PYIChokidar>((r) => {
            this.watcher.on('add', this.addFile.bind(this));
            this.watcher.on('ready', () => r(this));
        }).then((_this) => {
            this.watcher.close();
            return _this;
        });
    }
}
