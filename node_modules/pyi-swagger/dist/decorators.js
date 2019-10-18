"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ramda_1 = __importDefault(require("ramda"));
var is_type_of_1 = __importDefault(require("is-type-of"));
var swagger_object_1 = require("./swagger.object");
var _desc = function (type, text) { return function (target, name, descriptor) {
    var _a;
    descriptor.value[type] = text;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, (_a = {}, _a[type] = text, _a));
    return descriptor;
}; };
var _params = function (type, parameters) { return function (target, name, descriptor) {
    var _a;
    if (!descriptor.value.parameters)
        descriptor.value.parameters = {};
    descriptor.value.parameters[type] = parameters;
    // additional wrapper for body
    var swaggerParameters = parameters;
    if (type === 'body') {
        swaggerParameters = [
            {
                name: 'data',
                description: 'request body',
                schema: {
                    type: 'object',
                    properties: parameters
                }
            }
        ];
    }
    else {
        swaggerParameters = Object.keys(swaggerParameters).map(function (key) {
            return Object.assign({ name: key }, swaggerParameters[key]);
        });
    }
    swaggerParameters.forEach(function (item) {
        item.in = type;
    });
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, (_a = {}, _a[type] = swaggerParameters, _a));
    return descriptor;
}; };
var request = function (method, path) { return function (target, name, descriptor) {
    path = path.split('/').map(function (item) {
        if (item.indexOf(':') === 0)
            item = "{" + item.substring(1) + "}";
        return item;
    }).join('/');
    method = ramda_1.default.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, {
        request: { method: method, path: path },
    });
    return descriptor;
}; };
exports.request = request;
var middlewares = function (middlewares) { return function (target, name, descriptor) {
    descriptor.value.middlewares = middlewares;
    return descriptor;
}; };
exports.middlewares = middlewares;
var security = function (security) { return function (target, name, descriptor) {
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, {
        security: security
    });
}; };
exports.security = security;
var deprecated = function (target, name, descriptor) {
    descriptor.value.deprecated = true;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, { deprecated: true });
    return descriptor;
};
exports.deprecated = deprecated;
var defaultResp = {
    200: { description: 'success' }
};
var responses = function (responses) {
    if (responses === void 0) { responses = defaultResp; }
    return function (target, name, descriptor) {
        descriptor.value.responses = responses;
        swagger_object_1.SwaggerInjectService.runtime().add(target, name, { responses: responses });
        return descriptor;
    };
};
exports.responses = responses;
var desc = ramda_1.default.curry(_desc);
exports.desc = desc;
// description and summary
var description = desc('description');
exports.description = description;
var summary = desc('summary');
exports.summary = summary;
var tags = desc('tags');
exports.tags = tags;
var params = ramda_1.default.curry(_params);
exports.params = params;
// below are [parameters]
// query params
var query = params('query');
exports.query = query;
// path params
var path = params('path');
exports.path = path;
// body params
var body = params('body');
exports.body = body;
// formData params
var formData = params('formData');
exports.formData = formData;
// class decorators
var tagsAll = function (items) { return function (target) {
    var tags = is_type_of_1.default.array(items) ? items : [items];
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { tags: tags });
}; };
exports.tagsAll = tagsAll;
var responsesAll = function (responses) {
    if (responses === void 0) { responses = defaultResp; }
    return function (target) {
        swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { responses: responses });
    };
};
exports.responsesAll = responsesAll;
var middlewaresAll = function (items) { return function (target) {
    var middlewares = is_type_of_1.default.array(items) ? items : [items];
    target.middlewares = middlewares;
}; };
exports.middlewaresAll = middlewaresAll;
var securityAll = function (security) { return function (target) {
    var authentitactions = is_type_of_1.default.array(security) ? security : [security];
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, {
        security: authentitactions
    });
}; };
exports.securityAll = securityAll;
var deprecatedAll = function (target) {
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { deprecated: true });
};
exports.deprecatedAll = deprecatedAll;
var prefix = function (prefix) { return function (target) {
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { prefix: prefix });
    target.prefix = prefix;
}; };
exports.prefix = prefix;
var queryAll = function (parameters, filters) {
    if (filters === void 0) { filters = ['ALL']; }
    return function (target) {
        if (!target.parameters)
            target.parameters = {};
        target.parameters.query = parameters; // used in wrapper.js for validation
        target.parameters.filters = filters; // used in wrapper.js for validation
        var swaggerParameters = Object.keys(parameters).map(function (key) {
            return Object.assign({ name: key }, parameters[key]);
        });
        swaggerParameters.forEach(function (item) {
            item.in = 'query';
        });
        swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { query: swaggerParameters }, filters);
    };
};
exports.queryAll = queryAll;
var Doc = {
    request: request,
    summary: summary,
    params: params,
    desc: desc,
    description: description,
    query: query,
    path: path,
    body: body,
    tags: tags,
    middlewares: middlewares,
    security: security,
    formData: formData,
    responses: responses,
    deprecated: deprecated,
    tagsAll: tagsAll,
    responsesAll: responsesAll,
    middlewaresAll: middlewaresAll,
    deprecatedAll: deprecatedAll,
    securityAll: securityAll,
    queryAll: queryAll,
    prefix: prefix
};
exports.default = Doc;

//# sourceMappingURL=sourcemaps/decorators.js.map
