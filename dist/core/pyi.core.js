"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    get ctx() {
        return this.app.ctx;
    }
    set ctx(ctx) {
        this.app.ctx = ctx;
    }
}
exports.PYICore = PYICore;

//# sourceMappingURL=../sourcemaps/core/pyi.core.js.map
