"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const core_1 = require("../core");
const routing_controllers_1 = require("routing-controllers");
const execption_1 = require("./execption");
__export(require("routing-controllers"));
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
    static _root() {
        return PYIController;
    }
}
exports.PYIController = PYIController;
/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
function Controller(config) {
    if (lodash_1.isFunction(config)) {
        routing_controllers_1.JsonController(undefined)(config);
    }
    else {
        return (target, key) => {
            const { prefix } = config;
            routing_controllers_1.JsonController(prefix ? prefix : undefined)(target);
        };
    }
}
exports.Controller = Controller;
function RequestMapping(config, key) {
    if (key) {
        lodash_1.map(RequestMappingMethod, (m) => {
            routing_controllers_1.Method(m, undefined)(config, key);
        });
        return execption_1.throws(config, key);
    }
    else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target, key) => {
            const { prefix, methods } = config;
            lodash_1.map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                routing_controllers_1.Method(m, prefix)(target, key);
            });
            return execption_1.throws(target, key);
        };
    }
}
exports.RequestMapping = RequestMapping;
/**
 * Middleware ===============================================
 */
// tslint:disable-next-line:max-classes-per-file
class PYIMiddleware extends core_1.PYICore {
    static _root() {
        return PYIMiddleware;
    }
}
exports.PYIMiddleware = PYIMiddleware;
/**
 * Extends for routing-controllers middleware
 * @param options extends routing-controllers middleware
 */
function Middleware(options) {
    return (target, key) => {
        routing_controllers_1.Middleware(options)(target);
    };
}
exports.Middleware = Middleware;
// tslint:disable-next-line:max-classes-per-file
class PYIInterceptor extends core_1.PYICore {
    constructor(...props) { super(); }
    static _root() {
        return PYIInterceptor;
    }
}
exports.PYIInterceptor = PYIInterceptor;
/**
 * Extends for routing-controllers Interceptor
 * @param options extends routing-controllers Interceptor
 */
function Interceptor(options) {
    return (target, key) => {
        routing_controllers_1.Interceptor(options)(target);
    };
}
exports.Interceptor = Interceptor;
function Body(options) {
    return (target, key, idx) => {
        routing_controllers_1.Body({ ...options, validate: false })(target, key, idx);
        const fn = target[key];
        // tslint:disable-next-line:only-arrow-functions
        target[key] = function (...args) {
            const valid = args[idx];
            return valid.validate().then((errors) => {
                if (errors.length === 0) {
                    return fn(...args);
                }
                return valid.throws.apply(this, errors);
            });
        };
        return target[key];
    };
}
exports.Body = Body;

//# sourceMappingURL=../sourcemaps/decorators/controller.js.map
