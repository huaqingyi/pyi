import chokidar, { FSWatcher } from 'chokidar';
import { blue } from 'colors';
import { map } from 'lodash';
import { PYIAutoAppConfiguration, PYIApplication } from '../decorators';
import { dirname } from 'path';

export class PYIChokidar {
    public static runtime(mode: string) {
        return new PYIChokidar(mode);
    }

    public files: { [x: string]: any };
    public comps: any[];
    public appconfig: any;
    public mode: string;

    private dirname: string | string[];
    private root: string;
    private watcher: FSWatcher;
    private app!: PYIApplication;

    constructor(mode: string) {
        this.files = {};
        this.comps = [];
        this.mode = mode;
        this.root = process.argv[1];
        this.dirname = dirname(this.root);
        this.watcher = chokidar.watch([
            `${this.dirname}/**/*.js`,
            `${this.dirname}/**/*.ts`,
            `${this.dirname}/**/*.jsx`,
            `${this.dirname}/**/*.tsx`,
        ], {
            ignored: new RegExp(`${this.root}|\.d\.ts`, 'gi')
        });
    }

    public async addFile(path: string) {
        // if (path.indexOf('.d.ts') !== -1) { return path; }
        const comp = await import(path);
        if (!comp) { return false; }
        await Promise.all(map(comp, async (o, i) => {
            if (!comp[i] || !comp[i].prototype) { return await o; }
            comp[i].prototype.app = this.app;
            comp[i].prototype.mode = await this.mode;
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path
                });
            }
            const { _root } = await comp[i];
            if (_root && _root() === PYIAutoAppConfiguration) {
                this.appconfig = await (new (comp[i] as any)())._runtime();
            }
            await this.comps.push(o);
            return await o;
        }));
        this.files[path] = comp;
        console.log(blue(`File ${path} has been added ...`));
    }

    public async setup(app: PYIApplication): Promise<PYIChokidar> {
        this.app = app;
        return new Promise<PYIChokidar>((r) => {
            this.watcher.on('add', this.addFile.bind(this));
            this.watcher.on('ready', () => r(this));
        }).then((_this) => {
            this.watcher.close();
            return _this;
        });
    }
}
