"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var __param = this && this.__param || function (paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const src_1 = require("/Users/yihuaqing/Desktop/yihq/pyi/src");

const service_1 = require("./service");

const dao_1 = require("./dao");

const dto_1 = require("./dto");

let SettingController = class SettingController extends src_1.PYIController {
  async test() {
    // this.logger.error(1111);
    // // console.log(111);
    // console.log(await this.service.findAll());
    throw new Error('测试');
    return 111;
  }

  async string() {
    return `<h1>test ...</h1>`;
  }

  error() {
    return src_1.PYIExecption(class extends src_1.PYIThrows {
      async throws() {
        // console.log(await this.service.test());
        return 'test ...';
      }

    });
  }

  valid(login) {
    return src_1.PYIExecption(class extends src_1.PYIThrows {
      async throws() {
        return 'test ...';
      }

    });
  }

  async excludeJWT() {
    return await [this.test];
  }

};

__decorate([src_1.autoconnect, __metadata("design:type", service_1.TestService)], SettingController.prototype, "service", void 0);

__decorate([src_1.RequestMapping({
  prefix: '/test',
  methods: [src_1.RequestMappingMethod.GET]
}), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", Promise)], SettingController.prototype, "test", null);

__decorate([src_1.RequestMapping({
  prefix: '/test/:id'
}), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", Promise)], SettingController.prototype, "string", null);

__decorate([src_1.RequestMapping({
  prefix: '/error'
}), __metadata("design:type", Function), __metadata("design:paramtypes", []), __metadata("design:returntype", dto_1.ResponseDto)], SettingController.prototype, "error", null);

__decorate([src_1.RequestMapping({
  prefix: '/valid',
  methods: [src_1.RequestMappingMethod.GET]
}), __param(0, src_1.Body({
  validate: true
})), __metadata("design:type", Function), __metadata("design:paramtypes", [dao_1.LoginDao]), __metadata("design:returntype", dto_1.ResponseDto)], SettingController.prototype, "valid", null);

SettingController = __decorate([src_1.Controller], SettingController);
exports.SettingController = SettingController;