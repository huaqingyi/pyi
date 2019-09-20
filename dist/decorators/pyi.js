"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../lib");
const koa_1 = __importDefault(require("koa"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
/**
 * base mian
 */
class PYIApplication extends koa_1.default {
    constructor() {
        super();
    }
    static _pyi() {
        return {};
    }
    static _extends() {
        return PYIApplication;
    }
    static main(args) {
        return 0;
    }
    /**
     * runtime bootstrap
     * @param projectpath application path
     * @param args cmd args
     */
    static runtime(projectpath) {
        PYIApplication.complete = (new rxjs_1.BehaviorSubject(null)).pipe(operators_1.filter((o) => o !== null));
        lib_1.PYIChokidar.runtime(projectpath, this);
    }
    async runtime(callback) {
        PYIApplication.complete.subscribe(callback);
    }
}
exports.PYIApplication = PYIApplication;
PYIApplication.isApplication = true;
/**
 * application main class
 * @param target application bootstrap classes(启动类)
 * @param key off
 */
function PYIBootstrap(target, key) {
    lib_1.PYIArgs.register();
    target.main(process.argv);
    target.runtime.bind(target);
}
exports.PYIBootstrap = PYIBootstrap;

//# sourceMappingURL=../sourcemaps/decorators/pyi.js.map
