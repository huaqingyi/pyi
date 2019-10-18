/**
 * used for building swagger docs object
 */
import is from 'is-type-of';
import _ from 'ramda';
import { reservedMethodNames } from 'koa-swagger-decorator/dist/utils';
import { Data } from 'koa-swagger-decorator/dist/types';
import init from 'koa-swagger-decorator/dist/swaggerTemplate';
import { getPath } from 'koa-swagger-decorator/dist/utils';

export class SwaggerInjectService {
    private static _this: SwaggerInjectService;

    public static register() {
        if (!SwaggerInjectService._this) {
            SwaggerInjectService._this = new SwaggerInjectService();
        }
        return SwaggerInjectService.runtime();
    }

    public static runtime() {
        if (!SwaggerInjectService._this) throw 'not register SwaggerInjectService service ...';
        return SwaggerInjectService._this;
    }

    public data: Data;

    constructor() {
        this.data = {};
    }

    public add(target: any, name: string, content: any) {
        if (!is.object(content)) {
            throw new Error('illegal params [content] for SwaggerInjectService.add');
        }

        // when using non-static method decorators
        // target will be class.prototype rather than class
        // hack and make target always be class itself
        if (!target.prototype && target.constructor) {
            target = target.constructor;
        }

        const key = `${target.name}-${name}`;
        if (!this.data[key]) this.data[key] = {};

        // merge class decorator and method decorator if it is an array
        // eg. query parameters, tag paramemters
        Object.keys(content).forEach((k) => {
            if (is.array(this.data[key][k])) {
                this.data[key][k] = [...this.data[key][k], ...content[k]];
                if (this.data[key][k].length === 0) return;
                this.data[key][k] = is.object(this.data[key][k][0]) ?
                    _.uniqBy((o: { name: string }) => o.name, this.data[key][k])
                    : _.uniq(this.data[key][k]);
            } else {
                Object.assign(this.data[key], { [k]: content[k] });
            }
        });
    }

    // only add to methods with a @request decorator
    public addMulti(target: any, content: any, filters = ['ALL']) {
        const staticMethods = Object.getOwnPropertyNames(target)
            .filter(method => !reservedMethodNames.includes(method));
        const methods = Object.getOwnPropertyNames(target.prototype)
            .filter(method => !reservedMethodNames.includes(method));

        [...staticMethods, ...methods].forEach((name) => {
            const key = `${target.name}-${name}`;
            if (!this.data[key] || !this.data[key].request) return;
            filters = filters.map(i => i.toLowerCase());
            if (
                filters.includes('all') ||
                filters.includes(this.data[key].request.method)
            ) {
                this.add(target, name, content);
            }
        });
    }

    public toJSON(options?: {
        title?: string,
        description?: string,
        version?: string,
        swaggerOptions?: object
    }) {
        if (!options) options = {};
        const {
            title,
            description,
            version,
            prefix = '',
            swaggerOptions = {}
        } = options as any;
        const swaggerJSON: any = init(title, description, version, swaggerOptions);
        Object.keys(this.data).forEach((key) => {
            const value = this.data[key];
            if (!Object.keys(value).includes('request')) {
                return;
            }

            const { method } = value.request;
            let { path } = value.request;
            path = getPath(prefix, value.prefix ? `${value.prefix}${path}` : path); // 根据前缀补全path
            const summary = value.summary || '';
            const description = value.description || summary;
            const responses = value.responses || {
                200: { description: 'success' }
            };
            const {
                query = [],
                path: pathParams = [],
                body = [],
                tags,
                formData = [],
                security,
                deprecated
            } = value;

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
    };
}
