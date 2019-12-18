"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins_1 = require("../core/plugins");
const koa_logger_1 = __importDefault(require("koa-logger"));
class HttpLogger extends plugins_1.PYIPlugins {
    async install(ctx, next) {
        return koa_logger_1.default()(ctx, next);
    }
}
exports.HttpLogger = HttpLogger;

//# sourceMappingURL=../sourcemaps/plugins/http.logger.js.map
