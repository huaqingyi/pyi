"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const extends_1 = require("../extends");
const lodash_1 = require("lodash");
// tslint:disable-next-line:no-var-requires
const pathToRegExp = require('path-to-regexp');
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dto_1 = require("./dto");
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
function JsonController(baseRoute) {
    return (control) => {
        extends_1.getMetadataArgsStorage().actions = lodash_1.map(extends_1.getMetadataArgsStorage().actions, (action) => {
            const { target, route } = action;
            if (target === control) {
                const path = pathToRegExp(extends_1.ActionMetadata.appendBaseRoute(baseRoute || '', route));
                return { ...action, path };
            }
            return action;
        });
        extends_1.getMetadataArgsStorage().controllers.push({
            type: 'json', target: control, route: baseRoute || ''
        });
        return control;
    };
}
exports.JsonController = JsonController;
function Controller(props) {
    if (props._base && props._base() === PYIController) {
        JsonController(undefined)(props);
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            const { prefix } = props;
            JsonController(prefix ? prefix : undefined)(target);
            return target;
        };
    }
}
exports.Controller = Controller;
class PYIController extends core_1.PYICore {
    static _base() {
        return PYIController;
    }
    // public excludeJWT() {
    //     return [];
    // }
    async servlet(action, secretKey, context, next) {
        jsonwebtoken_1.default.verify(context.header.authorization, secretKey, async (err, decode) => {
            if (err) {
                const dto = new dto_1.ResponseDto({});
                dto.errcode = 1000;
                context.body = await dto.throws(err);
                await next(context);
            }
            else {
                context.state.token = decode;
                await next();
            }
        });
    }
}
exports.PYIController = PYIController;
function Method(method, route, docs) {
    return (object, methodName) => {
        extends_1.getMetadataArgsStorage().actions.push({
            type: method,
            target: object.constructor,
            method: methodName,
            route, docs,
        });
    };
}
exports.Method = Method;
function RequestMapping(config, key) {
    if (key) {
        lodash_1.map(RequestMappingMethod, (m) => {
            Method(m, undefined)(config, key);
        });
    }
    else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target, key) => {
            const { prefix, methods } = config;
            lodash_1.map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                Method(m, prefix, config)(target, key);
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
