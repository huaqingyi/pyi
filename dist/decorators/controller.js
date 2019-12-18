"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const extends_1 = require("../extends");
const lodash_1 = require("lodash");
__export(require("../extends"));
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
    RequestMappingMethod["CONNECT"] = "CONNECT";
    RequestMappingMethod["CHECKOUT"] = "CHECKOUT";
    RequestMappingMethod["COPY"] = "COPY";
    RequestMappingMethod["HEAD"] = "HEAD";
    RequestMappingMethod["LOCK"] = "LOCK";
    RequestMappingMethod["MERGE"] = "MERGE";
    RequestMappingMethod["MKACTIVITY"] = "MKACTIVITY";
    RequestMappingMethod["MKCOL"] = "MKCOL";
    RequestMappingMethod["MOVE"] = "MOVE";
    RequestMappingMethod["M_SEARCH"] = "m-search";
    RequestMappingMethod["NOTIFY"] = "NOTIFY";
    RequestMappingMethod["OPTIONS"] = "OPTIONS";
    RequestMappingMethod["PROPFIND"] = "PROPFIND";
    RequestMappingMethod["PROPPATCH"] = "PROPPATCH";
    RequestMappingMethod["PURGE"] = "PURGE";
    RequestMappingMethod["REPORT"] = "REPORT";
    RequestMappingMethod["SEARCH"] = "SEARCH";
    RequestMappingMethod["SUBSCRIBE"] = "SUBSCRIBE";
    RequestMappingMethod["TRACE"] = "TRACE";
    RequestMappingMethod["UNLOCK"] = "UNLOCK";
    RequestMappingMethod["UNSUBSCRIBE"] = "UNSUBSCRIBE";
})(RequestMappingMethod = exports.RequestMappingMethod || (exports.RequestMappingMethod = {}));
function Controller(props) {
    if (props._base && props._base() === PYIController) {
        extends_1.JsonController(undefined)(props);
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            const { prefix } = props;
            extends_1.JsonController(prefix ? prefix : undefined)(target);
            return target;
        };
    }
}
exports.Controller = Controller;
class PYIController extends core_1.PYICore {
    static _base() {
        return PYIController;
    }
}
exports.PYIController = PYIController;
function RequestMapping(config, key) {
    if (key) {
        lodash_1.map(RequestMappingMethod, (m) => {
            extends_1.Method(m, undefined)(config, key);
        });
    }
    else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target, key) => {
            const { prefix, methods } = config;
            lodash_1.map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                extends_1.Method(m, prefix)(target, key);
            });
        };
    }
}
exports.RequestMapping = RequestMapping;
function Middleware(props) {
    if (props._base && props._base() === PYIMiddleware) {
        props.prototype.props = { type: 'before' };
        extends_1.Middleware({ type: 'before' })(props);
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            extends_1.Middleware(props)(target);
            return target;
        };
    }
}
exports.Middleware = Middleware;
class PYIMiddleware extends core_1.PYICore {
    static _base() {
        return PYIMiddleware;
    }
}
exports.PYIMiddleware = PYIMiddleware;
function Interceptor(props) {
    if (props._base && props._base() === PYIInterceptor) {
        props.prototype.props = {};
        extends_1.Interceptor()(props);
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            extends_1.Interceptor(props)(target);
            return target;
        };
    }
}
exports.Interceptor = Interceptor;
class PYIInterceptor extends core_1.PYICore {
    static _base() {
        return PYIInterceptor;
    }
}
exports.PYIInterceptor = PYIInterceptor;

//# sourceMappingURL=../sourcemaps/decorators/controller.js.map
