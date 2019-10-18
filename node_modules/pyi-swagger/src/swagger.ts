import { SwaggerInjectService } from './swagger.object';
import Koa from 'koa';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-koa';
import convert from 'koa-convert';
import mount from 'koa-mount';

//with jsdoc
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
    },
    apis?: string[],
}

interface JsonObject extends SwaggerOption { [key: string]: any; }
interface SwaggerUiOptions { [key: string]: any; }
interface SwaggerOptions { [key: string]: any; }

export class Swagger {
    public static build(
        path: string,
        app: Koa,
        swaggerDoc?: JsonObject | null,
        opts?: SwaggerUiOptions | false | null,
        options?: SwaggerOptions,
        customCss?: string | false | null,
        customfavIcon?: string | false | null,
        swaggerUrl?: string | false | null,
        customeSiteTitle?: string | false | null
    ) {
        const config = SwaggerInjectService.runtime().toJSON();
        let swaggerSpec = {};
        if (swaggerDoc) {
            swaggerSpec = swaggerJSDoc(swaggerDoc as any);
        }
        app.use(swaggerUi.serve); //serve swagger static files
        app.use(convert(mount(path, swaggerUi.setup(
            { ...config, ...swaggerSpec },
            opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle
        ))));
    }
}