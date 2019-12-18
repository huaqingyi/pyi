"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("./pyi");
class PYIPlugins extends pyi_1.PYICore {
    constructor(drive) {
        super();
        this.drive = drive;
    }
    static _base() {
        return PYIPlugins;
    }
    async init() {
        return await this.drive.use(this.install);
    }
    install(ctx, next) {
        return next();
    }
}
exports.PYIPlugins = PYIPlugins;

//# sourceMappingURL=../sourcemaps/core/plugins.js.map
