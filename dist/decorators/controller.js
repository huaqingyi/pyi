"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestMapping = exports.Controller = exports.PYIController = exports.RequestMappingMethod = void 0;
const core_1 = require("../core");
const util_1 = require("util");
/**
 * Controller ================================
 */
var RequestMappingMethod;
(function (RequestMappingMethod) {
    RequestMappingMethod["GET"] = "GET";
    RequestMappingMethod["POST"] = "POST";
    RequestMappingMethod["DELETE"] = "DELETE";
    RequestMappingMethod["PUT"] = "PUT";
    RequestMappingMethod["PATCH"] = "PATCH";
})(RequestMappingMethod = exports.RequestMappingMethod || (exports.RequestMappingMethod = {}));
class PYIController extends core_1.PYICore {
    static _base() {
        return PYIController;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIController = PYIController;
function Controller(props) {
    const base = props && props._base && util_1.isFunction(props._base) && props._base();
    if (base === PYIController) {
        return props;
    }
    return (target) => {
        return target;
    };
}
exports.Controller = Controller;
function RequestMapping(props, method) {
    if (method) {
        return props;
    }
    return (target, kmethod) => {
        return target;
    };
}
exports.RequestMapping = RequestMapping;

//# sourceMappingURL=../sourcemaps/decorators/controller.js.map
