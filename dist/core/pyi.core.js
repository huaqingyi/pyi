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
    set dto(bool) {
        this._dto = bool;
        this.app.dto = this._dto;
    }
    get dto() {
        return this.app.dto;
    }
}
exports.PYICore = PYICore;

//# sourceMappingURL=../sourcemaps/core/pyi.core.js.map
