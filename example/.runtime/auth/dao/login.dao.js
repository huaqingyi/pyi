"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDao = void 0;
const src_1 = require("../../../../src");
const class_validator_1 = require("class-validator");
const koa_swagger_decorator_1 = require("koa-swagger-decorator");
let LoginDao = /** @class */ (() => {
    let LoginDao = class LoginDao extends src_1.PYIDao {
    };
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        koa_swagger_decorator_1.swaggerProperty({
            type: 'string',
            required: true,
            example: '1234',
            description: '用户名'
        }),
        __metadata("design:type", String)
    ], LoginDao.prototype, "username", void 0);
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        koa_swagger_decorator_1.swaggerProperty({
            type: 'string',
            required: true,
            example: '123123',
            description: '密码'
        }),
        __metadata("design:type", String)
    ], LoginDao.prototype, "password", void 0);
    LoginDao = __decorate([
        src_1.Dao,
        koa_swagger_decorator_1.swaggerClass()
    ], LoginDao);
    return LoginDao;
})();
exports.LoginDao = LoginDao;
