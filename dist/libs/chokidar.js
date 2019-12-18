"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chokidar_1 = __importDefault(require("chokidar"));
const colors_1 = require("colors");
const lodash_1 = require("lodash");
const path_1 = require("path");
const decorators_1 = require("../decorators");
const node_emoji_1 = require("node-emoji");
class PYIChokidar {
    constructor(mode, callback) {
        this.comps = [];
        this.fileTrans = {};
        this.mode = mode;
        this.callback = callback;
        this.appPath = process.argv[1];
        this.projectPath = path_1.dirname(this.appPath);
        this.watcher = chokidar_1.default.watch(this.projectPath, {
            ignored: new RegExp(`${this.appPath}|.d.ts`, 'gi')
        });
    }
    static async runtime(mode, callback) {
        return (new PYIChokidar(mode, callback)).runtime();
    }
    async addFile(path) {
        let comp = {};
        try {
            comp = await Promise.resolve().then(() => __importStar(require(path)));
            // tslint:disable-next-line:no-empty
        }
        catch (err) { }
        if (!comp) {
            return false;
        }
        await Promise.all(lodash_1.map(comp, async (o, i) => {
            if (!comp[i] || !comp[i].prototype) {
                return await o;
            }
            comp[i].prototype.mode = await this.mode;
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path
                });
            }
            else {
                comp[i]._pyi = () => ({ path });
            }
            const { _base } = await comp[i];
            if (_base && _base() === decorators_1.PYIAppConfiguration) {
                this.config = await comp[i]._pyiconnect()._pyiruntime();
            }
            await this.callback(o);
            await this.comps.push(o);
            return await o;
        }));
        this.fileTrans[path] = comp;
        console.log(`${node_emoji_1.get('kiss')}  ${colors_1.gray(`ready ${path} has been added ...`)}`);
    }
    async runtime() {
        return new Promise((r) => {
            this.watcher.on('add', this.addFile.bind(this));
            this.watcher.on('ready', () => r(this));
        }).then((_this) => {
            this.watcher.close();
            return _this;
        });
    }
}
exports.PYIChokidar = PYIChokidar;

//# sourceMappingURL=../sourcemaps/libs/chokidar.js.map
