import chokidar, { FSWatcher } from 'chokidar';
import { blue } from 'colors';
import { map } from 'lodash';
import { PYIAutoAppConfiguration } from '../decorators';

export class PYIChokidar {
    public static runtime(dirname: string | string[], mode: string) {
        return new PYIChokidar(dirname, mode);
    }

    public files: { [x: string]: any };
    public comps: any[];
    public appconfig: any;
    public mode: string;

    private dirname: string | string[];
    private watcher: FSWatcher;

    constructor(dirname: string | string[], mode: string) {
        this.dirname = dirname;
        this.files = {};
        this.comps = [];
        this.mode = mode;
        this.watcher = chokidar.watch(this.dirname);
    }

    public async addFile(path: string) {
        const comp = await import(path);
        if (!comp) { return false; }
        await Promise.all(map(comp, async (o, i) => {
            if (!comp[i]) { return await o; }
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

    public async setup(): Promise<PYIChokidar> {
        return new Promise<PYIChokidar>((r) => {
            this.watcher.on('add', this.addFile.bind(this));
            this.watcher.on('ready', () => r(this));
        }).then((_this) => {
            this.watcher.close();
            return _this;
        });
    }
}
