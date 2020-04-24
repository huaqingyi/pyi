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

Object.defineProperty(exports, "__esModule", {
  value: true
});

const src_1 = require("/Users/yihuaqing/Desktop/yihq/pyi/src");

const database_1 = require("/Users/yihuaqing/Desktop/yihq/pyi/example/components/database");

const user_1 = require("../entity/user");

let TestService = class TestService extends src_1.PYIService {
  findAll() {
    return this.db.table(user_1.User).findAll({
      raw: true
    });
  }

  async test() {
    throw new Error('测试 Service Error ...');
    return await {
      name: 'Hello World ...'
    };
  }

};

__decorate([src_1.autoconnect, __metadata("design:type", database_1.Database)], TestService.prototype, "db", void 0);

TestService = __decorate([src_1.Service], TestService);
exports.TestService = TestService;