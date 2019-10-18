import Koa from 'koa';
/**
 * 参数
 */
export interface SwaggerOption {
    [x: string]: any;
    swaggerDefinition?: {
        info?: {
            title?: string;
            version?: string;
        };
    };
    apis?: string[];
}
interface JsonObject extends SwaggerOption {
    [key: string]: any;
}
interface SwaggerUiOptions {
    [key: string]: any;
}
interface SwaggerOptions {
    [key: string]: any;
}
export declare class Swagger {
    static build(path: string, app: Koa, swaggerDoc?: JsonObject | null, opts?: SwaggerUiOptions | false | null, options?: SwaggerOptions, customCss?: string | false | null, customfavIcon?: string | false | null, swaggerUrl?: string | false | null, customeSiteTitle?: string | false | null): void;
}
export {};
