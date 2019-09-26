"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let AfterMiddleware = class AfterMiddleware {
    async use(ctx, next) {
        if (ctx.body && this.chokider.isViewObject === false) {
            if (this.chokider.config.pyi.defaultVo) {
                ctx.body = await this.chokider.config.pyi.defaultVo(ctx.body);
            }
        }
        // console.log('after', ctx.body);
        return await next(ctx);
    }
};
AfterMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: 'after' })
], AfterMiddleware);
exports.AfterMiddleware = AfterMiddleware;

//# sourceMappingURL=../sourcemaps/helper/after.middleware.js.map
