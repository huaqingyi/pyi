"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const decorators_1 = require("../decorators");
class Maker {
    constructor(app) {
        this.app = app;
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
}
exports.Maker = Maker;

//# sourceMappingURL=../sourcemaps/libs/maker.js.map
