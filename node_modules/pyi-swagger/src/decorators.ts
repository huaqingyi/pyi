import _ from 'ramda';
import is from 'is-type-of';
import { SwaggerInjectService } from './swagger.object';

const _desc = (type: string, text: string | any[]) => (target: any, name: string, descriptor: PropertyDescriptor) => {
    descriptor.value[type] = text;
    SwaggerInjectService.runtime().add(target, name, { [type]: text });
    return descriptor;
};

const _params = (type: string, parameters: { [name: string]: any }) => (target: any, name: string, descriptor: PropertyDescriptor) => {
    if (!descriptor.value.parameters) descriptor.value.parameters = {};
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
    } else {
        swaggerParameters = Object.keys(swaggerParameters).map(key =>
            Object.assign({ name: key }, swaggerParameters[key]));
    }
    swaggerParameters.forEach((item: any) => {
        item.in = type;
    });

    SwaggerInjectService.runtime().add(target, name, { [type]: swaggerParameters });
    return descriptor;
};

const request = (method: string, path: string) => (target: any, name: string, descriptor: PropertyDescriptor) => {
    path = path.split('/').map(item => {
        if (item.indexOf(':') === 0) item = `{${item.substring(1)}}`;
        return item;
    }).join('/');
    method = _.toLower(method);
    descriptor.value.method = method;
    descriptor.value.path = path;
    SwaggerInjectService.runtime().add(target, name, {
        request: { method, path },
    });
    return descriptor;
};

const middlewares = (middlewares: Function[]) => (target: any, name: string, descriptor: PropertyDescriptor) => {
    descriptor.value.middlewares = middlewares;
    return descriptor;
};

const security = (security: any[]) => (target: any, name: string, descriptor: PropertyDescriptor) => {
    SwaggerInjectService.runtime().add(target, name, {
        security
    });
};

const deprecated = (target: any, name: string, descriptor: PropertyDescriptor) => {
    descriptor.value.deprecated = true;
    SwaggerInjectService.runtime().add(target, name, { deprecated: true });
    return descriptor;
};

export interface IResponses {
    [name: number]: any;
}
const defaultResp: IResponses = {
    200: { description: 'success' }
};
const responses = (responses: IResponses = defaultResp) => (
    target: any,
    name: string,
    descriptor: PropertyDescriptor
) => {
    descriptor.value.responses = responses;
    SwaggerInjectService.runtime().add(target, name, { responses });
    return descriptor;
};
const desc = _.curry(_desc);

// description and summary
const description = desc('description');

const summary = desc('summary');

const tags = desc('tags');

const params = _.curry(_params);

// below are [parameters]

// query params
const query = params('query');

// path params
const path = params('path');

// body params
const body = params('body');

// formData params
const formData = params('formData');

// class decorators
const tagsAll = (items: string[] | string) => (target: any) => {
    const tags = is.array(items) ? items : [items];
    SwaggerInjectService.runtime().addMulti(target, { tags });
};

const responsesAll = (responses: IResponses = defaultResp) => (target: any) => {
    SwaggerInjectService.runtime().addMulti(target, { responses });
};

const middlewaresAll = (items: Function[] | Function) => (target: any) => {
    const middlewares = is.array(items) ? items : [items];
    target.middlewares = middlewares;
};

const securityAll = (security: any[] | any) => (target: any) => {
    const authentitactions = is.array(security) ? security : [security];
    SwaggerInjectService.runtime().addMulti(target, {
        security: authentitactions
    });
};

const deprecatedAll = (target: any) => {
    SwaggerInjectService.runtime().addMulti(target, { deprecated: true });
};

const prefix = (prefix: string) => (target: any) => {
    SwaggerInjectService.runtime().addMulti(target, { prefix });
    target.prefix = prefix;
};

const queryAll = (parameters: { [name: string]: any }, filters = ['ALL']) => (target: any) => {
    if (!target.parameters) target.parameters = {};
    target.parameters.query = parameters; // used in wrapper.js for validation
    target.parameters.filters = filters; // used in wrapper.js for validation
    const swaggerParameters = Object.keys(parameters).map(key =>
        Object.assign({ name: key }, parameters[key]));
    swaggerParameters.forEach((item) => {
        item.in = 'query';
    });
    SwaggerInjectService.runtime().addMulti(target, { query: swaggerParameters }, filters);
};
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

export default Doc;

export {
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
    securityAll,
    deprecatedAll,
    queryAll,
    prefix
};
