"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dao = exports.PYIDao = void 0;
const core_1 = require("../core");
class PYIDao extends core_1.PYICore {
    static _base() {
        return PYIDao;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIDao = PYIDao;
function Dao(target) {
    return target;
}
exports.Dao = Dao;

//# sourceMappingURL=../sourcemaps/decorators/dao.js.map
