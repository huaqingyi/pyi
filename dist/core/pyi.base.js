"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PYIBase {
    constructor() {
        PYIBase._this = this;
    }
    static _pyi() {
        return {};
    }
    static _baisc() {
        return PYIBase;
    }
    static Execption(execption, Vo) {
        execption.bind(PYIBase._this);
        const exinstance = new execption();
        const ex = exinstance.throws();
        if (Vo) {
            return ex.then((resp) => {
                return PYIBase._this.ctx = new Vo(resp);
                // return new Vo(resp);
            }).catch((err) => {
                const { errno, errmsg } = exinstance;
                return PYIBase._this.ctx = (new Vo()).throws(err, errno, errmsg);
                // return (new Vo()).throws(err, errno, errmsg);
            });
        }
        else {
            return ex;
        }
        // return PYIController._this.ctx.vo = vo;
    }
}
exports.PYIBase = PYIBase;

//# sourceMappingURL=../sourcemaps/core/pyi.base.js.map
