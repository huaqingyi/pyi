"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PYIBootstrap = exports.PYIApplication = void 0;
const pyi_1 = require("../core/pyi");
const lodash_1 = require("lodash");
const path_1 = require("path");
const chokidar_1 = __importDefault(require("chokidar"));
const factory_1 = require("../factory");
const controller_1 = require("./controller");
const colors_1 = require("colors");
const node_emoji_1 = require("node-emoji");
const configuration_1 = require("./configuration");
const fs_1 = require("fs");
const koa_1 = __importDefault(require("koa"));
class PYIApplication extends koa_1.default {
    constructor() {
        super();
        if (!this.source) {
            this.source = '.';
        }
        this.diresource = [];
        this.comps = [];
        this.config = new configuration_1.PYIAppConfiguration();
        this.mode = 'development';
        if (process.env.NODE_ENV) {
            this.mode = process.env.NODE_ENV;
        }
    }
    static _root() {
        return pyi_1.PYICore;
    }
    static _base() {
        return PYIApplication;
    }
    static _extends() {
        return this.__proto__;
    }
    static _singleton(...props) {
        if (!this._i) {
            this._i = new this();
        }
        return this._i;
    }
    _input(...props) {
        return this;
    }
    _output(...props) {
        return Promise.resolve(this[this.mode]).then(async (action) => {
            // tslint:disable-next-line: no-unused-expression
            action && await action.apply(this);
            return await this;
        });
    }
    /**
     * import files components
     */
    async configrationInit() {
        const factorys = [];
        await Promise.all(lodash_1.map(this.comps, async (comp, i) => {
            const { _base } = await comp;
            /**
             * search components have @autoconnect | @autowired prototype
             */
            await Promise.all(lodash_1.map(comp.prototype, async (prototype) => {
                if (prototype && prototype._base && prototype._base() === factory_1.FactoryComponent) {
                    prototype._input(comp);
                    factorys.push(prototype);
                }
                return await prototype;
            }));
            if (_base && _base() === controller_1.PYIController) {
                this.config.controllers.push(comp);
            }
            return await comp;
        }));
        await this.factoryComponent(factorys);
        return await this.config;
    }
    async factoryComponent(factorys) {
        const fs = [];
        await Promise.all(lodash_1.map(factorys, async (factory) => {
            if (lodash_1.find(factorys, ({ target }) => {
                return target === factory.component;
            })) {
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
    async addFile(path) {
        let comp = {};
        try {
            comp = await Promise.resolve().then(() => __importStar(require(path)));
            // tslint:disable-next-line:no-empty
        }
        catch (err) {
            console.log(colors_1.bgWhite(`${node_emoji_1.get('no_entry')}  ${colors_1.red(err)}`));
        }
        if (!comp) {
            return false;
        }
        await Promise.all(lodash_1.map(comp, async (o) => {
            if (!o || !o.prototype) {
                return await o;
            }
            o.prototype.mode = await this.mode;
            o.path = path;
            const { _base } = await o;
            if (_base && _base() === configuration_1.PYIAppConfiguration) {
                this.config = await o._singleton()._output();
                if (!this.config.controllers) {
                    this.config.controllers = [];
                }
            }
            await this.comps.push(o);
            return await o;
        }));
        console.log(`${node_emoji_1.get('kiss')}  ${colors_1.gray(`ready ${path} has been added ...`)}`);
        return await this.comps;
    }
    setResource(source) {
        this.source = source;
    }
    async create() {
        console.log('create ...');
        await new Promise((r) => chokidar_1.default.watch(this.source, {
            ignored: (src) => {
                const isCompile = /[^\.d]\.(ts|js|tsx|jsx)$/gi.test(src);
                return (!isCompile) && fs_1.statSync(src).isFile();
            }
        }).on('add', (path) => {
            this.diresource.push(path);
        }).on('ready', r));
        return this;
    }
    async bootstrap() {
        console.log('bootstrap ...');
        await Promise.all(lodash_1.map(this.diresource, async (path) => {
            return await this.addFile(path);
        }));
        await this.configrationInit();
        console.log(this.config.controllers);
    }
}
exports.PYIApplication = PYIApplication;
function PYIBootstrap(props) {
    const base = props && props._base && lodash_1.isFunction(props._base) && props._base();
    if (base === PYIApplication) {
        props.prototype.source = path_1.dirname(process.argv[1]);
        return props;
    }
    return (target) => {
        props.prototype.source = props;
        return target;
    };
}
exports.PYIBootstrap = PYIBootstrap;

//# sourceMappingURL=../sourcemaps/decorators/application.js.map
