"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used for building swagger docs object
 */
var is_type_of_1 = __importDefault(require("is-type-of"));
var ramda_1 = __importDefault(require("ramda"));
var utils_1 = require("koa-swagger-decorator/dist/utils");
var swaggerTemplate_1 = __importDefault(require("koa-swagger-decorator/dist/swaggerTemplate"));
var utils_2 = require("koa-swagger-decorator/dist/utils");
var SwaggerInjectService = /** @class */ (function () {
    function SwaggerInjectService() {
        this.data = {};
    }
    SwaggerInjectService.register = function () {
        if (!SwaggerInjectService._this) {
            SwaggerInjectService._this = new SwaggerInjectService();
        }
        return SwaggerInjectService.runtime();
    };
    SwaggerInjectService.runtime = function () {
        if (!SwaggerInjectService._this)
            throw 'not register SwaggerInjectService service ...';
        return SwaggerInjectService._this;
    };
    SwaggerInjectService.prototype.add = function (target, name, content) {
        var _this_1 = this;
        if (!is_type_of_1.default.object(content)) {
            throw new Error('illegal params [content] for SwaggerInjectService.add');
        }
        // when using non-static method decorators
        // target will be class.prototype rather than class
        // hack and make target always be class itself
        if (!target.prototype && target.constructor) {
            target = target.constructor;
        }
        var key = target.name + "-" + name;
        if (!this.data[key])
            this.data[key] = {};
        // merge class decorator and method decorator if it is an array
        // eg. query parameters, tag paramemters
        Object.keys(content).forEach(function (k) {
            var _a;
            if (is_type_of_1.default.array(_this_1.data[key][k])) {
                _this_1.data[key][k] = __spreadArrays(_this_1.data[key][k], content[k]);
                if (_this_1.data[key][k].length === 0)
                    return;
                _this_1.data[key][k] = is_type_of_1.default.object(_this_1.data[key][k][0]) ?
                    ramda_1.default.uniqBy(function (o) { return o.name; }, _this_1.data[key][k])
                    : ramda_1.default.uniq(_this_1.data[key][k]);
            }
            else {
                Object.assign(_this_1.data[key], (_a = {}, _a[k] = content[k], _a));
            }
        });
    };
    // only add to methods with a @request decorator
    SwaggerInjectService.prototype.addMulti = function (target, content, filters) {
        var _this_1 = this;
        if (filters === void 0) { filters = ['ALL']; }
        var staticMethods = Object.getOwnPropertyNames(target)
            .filter(function (method) { return !utils_1.reservedMethodNames.includes(method); });
        var methods = Object.getOwnPropertyNames(target.prototype)
            .filter(function (method) { return !utils_1.reservedMethodNames.includes(method); });
        __spreadArrays(staticMethods, methods).forEach(function (name) {
            var key = target.name + "-" + name;
            if (!_this_1.data[key] || !_this_1.data[key].request)
                return;
            filters = filters.map(function (i) { return i.toLowerCase(); });
            if (filters.includes('all') ||
                filters.includes(_this_1.data[key].request.method)) {
                _this_1.add(target, name, content);
            }
        });
    };
    SwaggerInjectService.prototype.toJSON = function (options) {
        var _this_1 = this;
        if (!options)
            options = {};
        var _a = options, title = _a.title, description = _a.description, version = _a.version, _b = _a.prefix, prefix = _b === void 0 ? '' : _b, _c = _a.swaggerOptions, swaggerOptions = _c === void 0 ? {} : _c;
        var swaggerJSON = swaggerTemplate_1.default(title, description, version, swaggerOptions);
        Object.keys(this.data).forEach(function (key) {
            var value = _this_1.data[key];
            if (!Object.keys(value).includes('request')) {
                return;
            }
            var method = value.request.method;
            var path = value.request.path;
            path = utils_2.getPath(prefix, value.prefix ? "" + value.prefix + path : path); // 根据前缀补全path
            var summary = value.summary || '';
            var description = value.description || summary;
            var responses = value.responses || {
                200: { description: 'success' }
            };
            var _a = value.query, query = _a === void 0 ? [] : _a, _b = value.path, pathParams = _b === void 0 ? [] : _b, _c = value.body, body = _c === void 0 ? [] : _c, tags = value.tags, _d = value.formData, formData = _d === void 0 ? [] : _d, security = value.security, deprecated = value.deprecated;
            var parameters = __spreadArrays(pathParams, query, formData, body);
            // init path object first
            if (!swaggerJSON.paths[path]) {
                swaggerJSON.paths[path] = {};
            }
            // add content type [multipart/form-data] to support file upload
            var consumes = formData.length > 0 ? ['multipart/form-data'] : undefined;
            swaggerJSON.paths[path][method] = {
                consumes: consumes,
                summary: summary,
                description: description,
                parameters: parameters,
                responses: responses,
                tags: tags,
                security: security,
                deprecated: deprecated
            };
        });
        return swaggerJSON;
    };
    ;
    return SwaggerInjectService;
}());
exports.SwaggerInjectService = SwaggerInjectService;

//# sourceMappingURL=sourcemaps/swagger.object.js.map
