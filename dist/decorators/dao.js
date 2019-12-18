"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Dao(props) {
    if (props._base && props._base() === PYIDao) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.Dao = Dao;
class PYIDao extends core_1.PYICore {
    static _base() {
        return PYIDao;
    }
}
exports.PYIDao = PYIDao;

//# sourceMappingURL=../sourcemaps/decorators/dao.js.map
