"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PYICore {
    static _pyi() {
        return {};
    }
    static _root() {
        return PYICore;
    }
    static _extends() {
        return this.__proto__;
    }
    static _runtime() {
        return this;
    }
    static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }
    set dto(bool) {
        this._dto = bool;
        this.app.dto = this._dto;
    }
    get dto() {
        return this.app.dto;
    }
    get config() {
        return this.app.config;
    }
    get tokenConfig() {
        return this.app.config.jwt;
    }
    get token() {
        return {
            ...jsonwebtoken_1.default,
            translate: (token) => {
                return jsonwebtoken_1.default.verify(token, this.tokenConfig.secret);
            }
        };
    }
    get ctx() {
        return this.app.ctx;
    }
    set ctx(ctx) {
        this.app.ctx = ctx;
    }
}
exports.PYICore = PYICore;

//# sourceMappingURL=../sourcemaps/core/pyi.core.js.map
