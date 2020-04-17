"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * used for building swagger docs object
 */
const is_type_of_1 = __importDefault(require("is-type-of"));
const ramda_1 = __importDefault(require("ramda"));
const utils_1 = require("koa-swagger-decorator/dist/utils");
const swaggerTemplate_1 = __importDefault(require("koa-swagger-decorator/dist/swaggerTemplate"));
const utils_2 = require("koa-swagger-decorator/dist/utils");
class SwaggerInjectService {
    constructor() {
        this.data = {};
    }
    static register() {
        if (!SwaggerInjectService._this) {
            SwaggerInjectService._this = new SwaggerInjectService();
        }
        return SwaggerInjectService.runtime();
    }
    static runtime() {
        if (!SwaggerInjectService._this) {
            throw new Error('not register SwaggerInjectService service ...');
        }
        return SwaggerInjectService._this;
    }
    add(target, name, content) {
        if (!is_type_of_1.default.object(content)) {
            throw new Error('illegal params [content] for SwaggerInjectService.add');
        }
        // when using non-static method decorators
        // target will be class.prototype rather than class
        // hack and make target always be class itself
        if (!target.prototype && target.constructor) {
            target = target.constructor;
        }
        const key = `${target.name}-${name}`;
        if (!this.data[key]) {
            this.data[key] = {};
        }
        // merge class decorator and method decorator if it is an array
        // eg. query parameters, tag paramemters
        Object.keys(content).forEach((k) => {
            if (is_type_of_1.default.array(this.data[key][k])) {
                this.data[key][k] = [...this.data[key][k], ...content[k]];
                if (this.data[key][k].length === 0) {
                    return;
                }
                this.data[key][k] = is_type_of_1.default.object(this.data[key][k][0]) ?
                    ramda_1.default.uniqBy((o) => o.name, this.data[key][k])
                    : ramda_1.default.uniq(this.data[key][k]);
            }
            else {
                Object.assign(this.data[key], { [k]: content[k] });
            }
        });
    }
    // only add to methods with a @request decorator
    addMulti(target, content, filters = ['ALL']) {
        const staticMethods = Object.getOwnPropertyNames(target)
            .filter((method) => !utils_1.reservedMethodNames.includes(method));
        const methods = Object.getOwnPropertyNames(target.prototype)
            .filter((method) => !utils_1.reservedMethodNames.includes(method));
        [...staticMethods, ...methods].forEach((name) => {
            const key = `${target.name}-${name}`;
            if (!this.data[key] || !this.data[key].request) {
                return;
            }
            filters = filters.map((i) => i.toLowerCase());
            if (filters.includes('all') ||
                filters.includes(this.data[key].request.method)) {
                this.add(target, name, content);
            }
        });
    }
    toJSON(options) {
        if (!options) {
            options = {};
        }
        const { title, description, version, prefix = '', swaggerOptions = {} } = options;
        const swaggerJSON = swaggerTemplate_1.default(title, description, version, swaggerOptions);
        Object.keys(this.data).forEach((key) => {
            const value = this.data[key];
            if (!Object.keys(value).includes('request')) {
                return;
            }
            const { method } = value.request;
            let { path } = value.request;
            path = utils_2.getPath(prefix, value.prefix ? `${value.prefix}${path}` : path); // 根据前缀补全path
            const summary = value.summary || '';
            // tslint:disable-next-line:no-shadowed-variable
            const description = value.description || summary;
            const responses = value.responses || {
                200: { description: 'success' }
            };
            const { query = [], path: pathParams = [], body = [], tags, formData = [], security, deprecated } = value;
            const parameters = [...pathParams, ...query, ...formData, ...body];
            // init path object first
            if (!swaggerJSON.paths[path]) {
                swaggerJSON.paths[path] = {};
            }
            // add content type [multipart/form-data] to support file upload
            const consumes = formData.length > 0 ? ['multipart/form-data'] : undefined;
            swaggerJSON.paths[path][method] = {
                consumes,
                summary,
                description,
                parameters,
                responses,
                tags,
                security,
                deprecated
            };
        });
        return swaggerJSON;
    }
}
exports.SwaggerInjectService = SwaggerInjectService;

//# sourceMappingURL=../../sourcemaps/libs/swagger/swagger.object.js.map
