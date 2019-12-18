"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Service(props) {
    if (props._base && props._base() === PYIService) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.Service = Service;
class PYIService extends core_1.PYICore {
    static _base() {
        return PYIService;
    }
}
exports.PYIService = PYIService;

//# sourceMappingURL=../sourcemaps/decorators/service.js.map
