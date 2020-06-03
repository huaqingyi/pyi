"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.PYIService = void 0;
const core_1 = require("../core");
class PYIService extends core_1.PYICore {
    static _base() {
        return PYIService;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIService = PYIService;
/**
 * 服务组件
 * @param target service component
 * @param key off
 */
function Service(target) {
    return target;
}
exports.Service = Service;

//# sourceMappingURL=../sourcemaps/decorators/service.js.map
