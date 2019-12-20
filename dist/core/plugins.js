"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("./pyi");
class PYIPlugins extends pyi_1.PYICore {
    constructor(app) {
        super();
        this.app = app;
    }
    static _base() {
        return PYIPlugins;
    }
    install(ctx, next) {
        return next();
    }
    init() {
        return this.app.use(this.install);
    }
}
exports.PYIPlugins = PYIPlugins;

//# sourceMappingURL=../sourcemaps/core/plugins.js.map
