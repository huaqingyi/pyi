"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_object_1 = require("./swagger.object");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_koa_1 = __importDefault(require("swagger-ui-koa"));
const koa_convert_1 = __importDefault(require("koa-convert"));
const koa_mount_1 = __importDefault(require("koa-mount"));
class Swagger {
    static build(path, app, swaggerJSON, swaggerDoc, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle) {
        const config = swagger_object_1.SwaggerInjectService.runtime().toJSON();
        let swaggerSpec = {};
        if (swaggerDoc) {
            if (!swaggerDoc.apis) {
                swaggerDoc.apis = [];
            }
            swaggerSpec = swagger_jsdoc_1.default(swaggerDoc);
        }
        if (!swaggerJSON) {
            swaggerJSON = {};
        }
        app.use(swagger_ui_koa_1.default.serve); // serve swagger static files
        let paths = {};
        paths = {
            ...(config.paths || []),
            ...(swaggerSpec.paths || []),
            ...(swaggerJSON.paths || [])
        };
        app.use(koa_convert_1.default(koa_mount_1.default(path, swagger_ui_koa_1.default.setup({
            ...config,
            ...swaggerJSON,
            ...swaggerSpec,
            paths
        }, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle))));
    }
}
exports.Swagger = Swagger;

//# sourceMappingURL=../../sourcemaps/libs/swagger/swagger.js.map
