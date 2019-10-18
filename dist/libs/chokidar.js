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
const decorators_1 = require("../decorators");
class PYIChokidar {
    constructor(dirname, mode) {
        this.dirname = dirname;
        this.files = {};
        this.comps = [];
        this.mode = mode;
        this.watcher = chokidar_1.default.watch(this.dirname);
    }
    static runtime(dirname, mode) {
        return new PYIChokidar(dirname, mode);
    }
    async addFile(path) {
        const comp = await Promise.resolve().then(() => __importStar(require(path)));
        if (!comp) {
            return false;
        }
        await Promise.all(lodash_1.map(comp, async (o, i) => {
            if (!comp[i]) {
                return await o;
            }
            comp[i].prototype.mode = await this.mode;
            if (comp[i]._pyi) {
                const _pyi = comp[i]._pyi();
                comp[i]._pyi = () => ({
                    ..._pyi, path
                });
            }
            const { _root } = await comp[i];
            if (_root && _root() === decorators_1.PYIAutoAppConfiguration) {
                this.appconfig = await (new comp[i]())._runtime();
            }
            await this.comps.push(o);
            return await o;
        }));
        this.files[path] = comp;
        console.log(colors_1.blue(`File ${path} has been added ...`));
    }
    async setup() {
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
