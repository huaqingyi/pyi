"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var APP2_1;
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
let APP2 = APP2_1 = class APP2 extends src_1.PYIApplication {
    static main(args) {
        /**
         * 指定项目路径
         */
        APP2_1.runtime(__dirname);
    }
};
APP2 = APP2_1 = __decorate([
    src_1.PYIBootstrap
], APP2);
exports.APP2 = APP2;

//# sourceMappingURL=sourcemaps/app2.js.map
