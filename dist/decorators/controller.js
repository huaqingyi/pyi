"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
__export(require("routing-controllers"));
const routing_controllers_1 = require("routing-controllers");
const pyi_base_1 = require("../core/pyi.base");
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
class PYIController extends pyi_base_1.PYIBase {
    constructor(...props) { super(); }
    static _extends() {
        return PYIController;
    }
    static Execption(execption, Vo) {
        execption.bind(PYIController._this);
        const exinstance = new execption();
        const ex = exinstance.throws();
        return ex.then((resp) => {
            return new Vo(resp);
        }).catch((err) => {
            const { errno, errmsg } = exinstance;
            return (new Vo()).throws(err, errno, errmsg);
        });
        // return PYIController._this.ctx.vo = vo;
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
/**
 * Extends for routing-controllers ActionType
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
function RequestMapping(config, key) {
    if (key) {
        lodash_1.map(RequestMappingMethod, (m) => {
            routing_controllers_1.Method(m, undefined)(config, key);
        });
    }
    else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target, key) => {
            const Vo = Reflect.getMetadata('design:returntype', target, key);
            // console.log(vo);
            const { prefix, methods } = config;
            lodash_1.map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                routing_controllers_1.Method(m, prefix)(target, key);
            });
        };
    }
}
exports.RequestMapping = RequestMapping;
/**
 * Middleware ===============================================
 */
// tslint:disable-next-line:max-classes-per-file
class PYIMiddleware extends pyi_base_1.PYIBase {
    constructor(...props) { super(); }
    static _extends() {
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
class PYIInterceptor extends pyi_base_1.PYIBase {
    constructor(...props) { super(); }
    static _extends() {
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

//# sourceMappingURL=../sourcemaps/decorators/controller.js.map
