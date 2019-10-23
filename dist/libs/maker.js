"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const decorators_1 = require("../decorators");
const signale_1 = __importDefault(require("signale"));
class Maker {
    constructor(app) {
        this.app = app;
        this.app.success = signale_1.default.success;
        this.app.debug = signale_1.default.debug;
        this.app.pending = signale_1.default.pending;
        this.app.fatal = signale_1.default.fatal;
        this.app.watch = signale_1.default.watch;
        this.app.complete = signale_1.default.complete;
        this.app.error = signale_1.default.error;
    }
    static runtime(app) {
        return new this(app);
    }
    setup(comps) {
        const controllers = [];
        const middlewares = [];
        const interceptors = [];
        const components = [];
        lodash_1.map(comps, (comp) => {
            const { _root } = comp;
            this.useLoagger(comp);
            if (_root && _root() === decorators_1.PYIController) {
                controllers.push(comp);
            }
            if (_root && _root() === decorators_1.PYIMiddleware) {
                middlewares.push(comp);
            }
            if (_root && _root() === decorators_1.PYIInterceptor) {
                interceptors.push(comp);
            }
            if (_root && _root() === decorators_1.PYIComponent) {
                components.push(comp);
            }
        });
        this.app.controllers = this.app.controllers.concat(controllers);
        this.app.middlewares = this.app.middlewares.concat(middlewares);
        this.app.interceptors = this.app.interceptors.concat(interceptors);
        this.app.components = this.app.components.concat(components);
        return this.app;
    }
    useLoagger(comp) {
        if (comp.prototype) {
            comp.prototype.success = this.app.success;
            comp.prototype.debug = this.app.debug;
            comp.prototype.pending = this.app.pending;
            comp.prototype.fatal = this.app.fatal;
            comp.prototype.watch = this.app.watch;
            comp.prototype.complete = this.app.complete;
            comp.prototype.error = this.app.error;
        }
    }
}
exports.Maker = Maker;

//# sourceMappingURL=../sourcemaps/libs/maker.js.map
