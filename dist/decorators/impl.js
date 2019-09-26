"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const colors_1 = require("colors");
class PYIVo extends core_1.PYIBase {
    constructor(data) {
        super();
        this.err = false;
        this.data = data || {};
        if (this.ctx && this.ctx.app) {
            this.ctx.app.emit('vo', true, this.ctx);
        }
    }
    static _extends() {
        return PYIVo;
    }
    async throws(err, errno, errmsg) {
        this.err = true;
        this.errno = errno || 1003;
        if (errmsg) {
            this.errmsg = errmsg;
            console.log(colors_1.yellow(`${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`));
            // console.error(err);
        }
        else {
            this.errmsg = `${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`;
        }
        this.data = {};
        return this;
    }
}
exports.PYIVo = PYIVo;
function Vo(target, key) {
    // console.log('dto', target);
}
exports.Vo = Vo;

//# sourceMappingURL=../sourcemaps/decorators/impl.js.map
