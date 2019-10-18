"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const colors_1 = require("colors");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
class Application extends koa_1.default {
    constructor() {
        super();
        this._setup = (new rxjs_1.BehaviorSubject(null)).pipe(operators_1.filter((v) => !!v));
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
        this.components = [];
        this.dto = false;
        this.use(koa_bodyparser_1.default());
    }
    static _pyi() {
        return {};
    }
    static _root() {
        return Application;
    }
    static _extends() {
        return this.__proto__;
    }
    static _runtime() {
        return this;
    }
    static bootstrap() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }
    async setup(app, callback) {
        this.config.globalDto.prototype.app = this;
        // this.use(this.logger);
        this.on('error', async (err, ctx) => {
            if (this.dto === false && this.config.enableDto === true) {
                const Dto = this.config.globalDto;
                ctx.body = await (new Dto()).throws(err, 500);
            }
            else {
                ctx.body = err;
            }
        });
        this.use(async (ctx, next) => {
            const code = ctx.response.status;
            console.log(code);
            switch (code) {
                case 500:
                case 404: return await koa_logger_1.default((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.error(str);
                })(ctx, next);
                case 200: return await koa_logger_1.default((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.success(str);
                })(ctx, next);
                default: return await koa_logger_1.default((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.pending(str);
                })(ctx, next);
            }
        });
        this.use(async (ctx, next) => {
            if (ctx.response.status !== 200) {
                return await next();
            }
            if (this.dto === false && this.config.enableDto === true) {
                const Dto = this.config.globalDto;
                const trys = await new Dto(ctx.body);
                ctx.body = trys;
            }
            this.dto = false;
            return next();
        });
        // tslint:disable-next-line:no-unused-expression
        callback && callback.apply(this);
        this.listen(this.config.port, () => {
            // tslint:disable-next-line:no-unused-expression
            this.didRuntime && this.didRuntime.apply(this);
            console.log(colors_1.green(`PYI Server runtime listen: http://${this.config.host || 'localhost'}:${this.config.port}`));
        });
        return this;
    }
    starter(callback) {
        return this._setup.subscribe((app) => {
            this.setup(app, callback);
        });
    }
}
exports.Application = Application;

//# sourceMappingURL=../sourcemaps/core/app.core.js.map
