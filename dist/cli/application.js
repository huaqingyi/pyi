"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const koa_1 = __importDefault(require("koa"));
const signale_1 = require("signale");
/**
 * 继承 Koa 主类
 */
class PYIApplication extends koa_1.default {
    constructor() {
        super();
        this.logger = new signale_1.Signale();
    }
    static _pyi() {
        return {};
    }
    static _root() {
        return core_1.PYICore;
    }
    static _base() {
        return PYIApplication;
    }
    static _extends() {
        return this.__proto__;
    }
    static _pyiruntime() {
        return this;
    }
    static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }
}
exports.PYIApplication = PYIApplication;

//# sourceMappingURL=../sourcemaps/cli/application.js.map
