import { PYIApplication } from '../../decorators';
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
export interface SwaggerJSON {
    [x: string]: any;
    swagger?: string;
    info?: {
        description?: string;
        title?: string;
        termsOfService?: string;
        contact?: {
            email?: string;
        };
        license?: {
            name?: string;
            url?: string;
        };
    };
    host?: string;
    basePath?: string;
    tags?: Array<{
        name?: string;
        description?: string;
        externalDocs?: {
            description?: string;
            url?: string;
        };
    }>;
    schemes?: string[];
    paths?: {
        [x: string]: any;
    };
    securityDefinitions?: {
        api_key?: {
            type?: string;
            name?: string;
            in?: string;
        };
        petstore_auth?: {
            type?: string;
            authorizationUrl?: string;
            flow?: string;
            scopes?: {
                read?: string;
                write?: string;
            };
        };
    };
}
export declare class Swagger {
    static build(path: string, app: PYIApplication<any, any>, swaggerJSON?: SwaggerJSON, swaggerDoc?: JsonObject | null, opts?: SwaggerUiOptions | false | null, options?: SwaggerOptions, customCss?: string | false | null, customfavIcon?: string | false | null, swaggerUrl?: string | false | null, customeSiteTitle?: string | false | null): void;
}
export {};
