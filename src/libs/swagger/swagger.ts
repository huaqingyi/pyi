import { SwaggerInjectService } from './swagger.object';
import Koa from 'koa';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-koa';
import convert from 'koa-convert';
import mount from 'koa-mount';
import { PYIApplication } from '../../decorators';

// with jsdoc
// const options = {
//     swaggerDefinition: {
//       info: {
//         title: 'API', // Title (required)
//         version: '2.0.0', // Version (required)
//       },
//     },
//     apis: [
//       './src/module/swagger/swagger.yaml',
//       './src/routes/*.js', // Path to the API docs from root
//       './src/module/swagger/parameters.yaml'
//     ],
//   };
/**
 * 参数
 */
export interface SwaggerOption {
    [x: string]: any;
    swaggerDefinition?: {
        info?: {
            title?: string, // Title (required)
            version?: string, // Version (required)
        },
    };
    apis?: string[];
}

interface JsonObject extends SwaggerOption { [key: string]: any; }
interface SwaggerUiOptions { [key: string]: any; }
interface SwaggerOptions { [key: string]: any; }
export interface SwaggerJSON {
    [x: string]: any;
    swagger?: string;
    info?: {
        description?: string;
        title?: string;
        termsOfService?: string;
        contact?: {
            email?: string;
        },
        license?: {
            name?: string;
            url?: string;
        }
    };
    host?: string;
    basePath?: string;
    tags?: Array<{
        name?: string;
        description?: string;
        externalDocs?: {
            description?: string;
            url?: string;
        }
    }>;
    schemes?: string[];
    paths?: { [x: string]: any };
    securityDefinitions?: {
        api_key?: {
            type?: string;
            name?: string;
            in?: string;
        },
        petstore_auth?: {
            type?: string;
            authorizationUrl?: string;
            flow?: string;
            scopes?: {
                read?: string;
                write?: string;
            }
        }
    };
}

export class Swagger {
    public static build(
        path: string,
        app: PYIApplication<any, any>,
        swaggerJSON?: SwaggerJSON,
        swaggerDoc?: JsonObject | null,
        opts?: SwaggerUiOptions | false | null,
        options?: SwaggerOptions,
        customCss?: string | false | null,
        customfavIcon?: string | false | null,
        swaggerUrl?: string | false | null,
        customeSiteTitle?: string | false | null
    ) {
        const config = SwaggerInjectService.runtime().toJSON();
        let swaggerSpec: any = {};
        if (swaggerDoc) {
            if (!swaggerDoc.apis) { swaggerDoc.apis = []; }
            swaggerSpec = swaggerJSDoc(swaggerDoc as any);
        }
        if (!swaggerJSON) { swaggerJSON = {}; }
        app.use(swaggerUi.serve); // serve swagger static files
        let paths: any = {};
        paths = {
            ...(config.paths || []),
            ...(swaggerSpec.paths || []),
            ...(swaggerJSON.paths || [])
        };
        app.use(convert(mount(path, swaggerUi.setup({
            ...config,
            ...swaggerJSON,
            ...swaggerSpec,
            paths
        }, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle
        ))));
    }
}
