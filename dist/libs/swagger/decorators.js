"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = __importDefault(require("ramda"));
const is_type_of_1 = __importDefault(require("is-type-of"));
const swagger_object_1 = require("./swagger.object");
const _desc = (type, text) => (target, name, descriptor) => {
    descriptor.value[type] = text;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, { [type]: text });
    return descriptor;
};
const _params = (type, parameters) => (target, name, descriptor) => {
    if (!descriptor.value.parameters) {
        descriptor.value.parameters = {};
    }
    descriptor.value.parameters[type] = parameters;
    // additional wrapper for body
    let swaggerParameters = parameters;
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
        swaggerParameters = Object.keys(swaggerParameters).map((key) => Object.assign({ name: key }, swaggerParameters[key]));
    }
    swaggerParameters.forEach((item) => {
        item.in = type;
    });
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, { [type]: swaggerParameters });
    return descriptor;
};
const request = (
// tslint:disable-next-line:no-shadowed-variable
method, path) => (target, name, descriptor) => {
    if (typeof (path) === 'string') {
        path = path.split('/').map((item) => {
            if (item.indexOf(':') === 0) {
                item = `{${item.substring(1)}}`;
            }
            return item;
        }).join('/');
    }
    method = ramda_1.default.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, {
        request: { method, path },
    });
    return descriptor;
};
exports.request = request;
// tslint:disable-next-line:no-shadowed-variable
const middlewares = (middlewares) => (target, name, descriptor) => {
    descriptor.value.middlewares = middlewares;
    return descriptor;
};
exports.middlewares = middlewares;
// tslint:disable-next-line:no-shadowed-variable
const security = (security) => (target, name, descriptor) => {
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, {
        security
    });
};
exports.security = security;
const deprecated = (target, name, descriptor) => {
    descriptor.value.deprecated = true;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, { deprecated: true });
    return descriptor;
};
exports.deprecated = deprecated;
const defaultResp = {
    200: { description: 'success' }
};
// tslint:disable-next-line:no-shadowed-variable
const responses = (responses = defaultResp) => (target, name, descriptor) => {
    descriptor.value.responses = responses;
    swagger_object_1.SwaggerInjectService.runtime().add(target, name, { responses });
    return descriptor;
};
exports.responses = responses;
const desc = ramda_1.default.curry(_desc);
exports.desc = desc;
// description and summary
const description = desc('description');
exports.description = description;
const summary = desc('summary');
exports.summary = summary;
const tags = desc('tags');
exports.tags = tags;
const params = ramda_1.default.curry(_params);
exports.params = params;
// below are [parameters]
// query params
const query = params('query');
exports.query = query;
// path params
const path = params('path');
exports.path = path;
// body params
const body = params('body');
exports.body = body;
// formData params
const formData = params('formData');
exports.formData = formData;
// class decorators
const tagsAll = (items) => (target) => {
    // tslint:disable-next-line:no-shadowed-variable
    const tags = is_type_of_1.default.array(items) ? items : [items];
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { tags });
};
exports.tagsAll = tagsAll;
// tslint:disable-next-line:no-shadowed-variable
const responsesAll = (responses = defaultResp) => (target) => {
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { responses });
};
exports.responsesAll = responsesAll;
const middlewaresAll = (items) => (target) => {
    // tslint:disable-next-line:no-shadowed-variable
    const middlewares = is_type_of_1.default.array(items) ? items : [items];
    target.middlewares = middlewares;
};
exports.middlewaresAll = middlewaresAll;
// tslint:disable-next-line:no-shadowed-variable
const securityAll = (security) => (target) => {
    const authentitactions = is_type_of_1.default.array(security) ? security : [security];
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, {
        security: authentitactions
    });
};
exports.securityAll = securityAll;
const deprecatedAll = (target) => {
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { deprecated: true });
};
exports.deprecatedAll = deprecatedAll;
// tslint:disable-next-line:no-shadowed-variable
const prefix = (prefix) => (target) => {
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { prefix });
    target.prefix = prefix;
};
exports.prefix = prefix;
const queryAll = (parameters, filters = ['ALL']) => (target) => {
    if (!target.parameters) {
        target.parameters = {};
    }
    target.parameters.query = parameters; // used in wrapper.js for validation
    target.parameters.filters = filters; // used in wrapper.js for validation
    const swaggerParameters = Object.keys(parameters).map((key) => Object.assign({ name: key }, parameters[key]));
    swaggerParameters.forEach((item) => {
        item.in = 'query';
    });
    swagger_object_1.SwaggerInjectService.runtime().addMulti(target, { query: swaggerParameters }, filters);
};
exports.queryAll = queryAll;
const Doc = {
    request,
    summary,
    params,
    desc,
    description,
    query,
    path,
    body,
    tags,
    middlewares,
    security,
    formData,
    responses,
    deprecated,
    tagsAll,
    responsesAll,
    middlewaresAll,
    deprecatedAll,
    securityAll,
    queryAll,
    prefix
};
exports.default = Doc;

//# sourceMappingURL=../../sourcemaps/libs/swagger/decorators.js.map
