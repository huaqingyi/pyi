"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_object_1 = require("./swagger.object");
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_koa_1 = __importDefault(require("swagger-ui-koa"));
var koa_convert_1 = __importDefault(require("koa-convert"));
var koa_mount_1 = __importDefault(require("koa-mount"));
var Swagger = /** @class */ (function () {
    function Swagger() {
    }
    Swagger.build = function (path, app, swaggerDoc, opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle) {
        var config = swagger_object_1.SwaggerInjectService.runtime().toJSON();
        var swaggerSpec = {};
        if (swaggerDoc) {
            swaggerSpec = swagger_jsdoc_1.default(swaggerDoc);
        }
        app.use(swagger_ui_koa_1.default.serve); //serve swagger static files
        app.use(koa_convert_1.default(koa_mount_1.default(path, swagger_ui_koa_1.default.setup(__assign(__assign({}, config), swaggerSpec), opts, options, customCss, customfavIcon, swaggerUrl, customeSiteTitle))));
    };
    return Swagger;
}());
exports.Swagger = Swagger;

//# sourceMappingURL=sourcemaps/swagger.js.map
