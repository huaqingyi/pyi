"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PYICore = exports.PYICoreStandard = void 0;
class PYICoreStandard {
}
exports.PYICoreStandard = PYICoreStandard;
class PYICore {
    static _root() {
        return PYICore;
    }
    static _base() {
        return PYICore;
    }
    static _extends() {
        return this.__proto__;
    }
    static _singleton(...props) {
        if (!this._i) {
            this._i = new this();
        }
        return this._i;
    }
    _input(...props) {
        return this;
    }
    _output(...props) {
        return Promise.resolve(this[this.mode]).then(async (action) => {
            // tslint:disable-next-line: no-unused-expression
            action && await action.apply(this);
            return await this;
        });
    }
}
exports.PYICore = PYICore;

//# sourceMappingURL=../sourcemaps/core/pyi.js.map
