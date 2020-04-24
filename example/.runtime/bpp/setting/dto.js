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

let ResponseDto = class ResponseDto extends src_1.PYIDto {
  constructor(data) {
    super();
    this.data = data;
    this.success = true;
  }

  throws(errors) {
    this.success = false;

    switch (errors.name) {
      default:
        this.errcode = 1010;
        this.errmsg = errors.message;
        return this;
    }
  }

};
ResponseDto = __decorate([src_1.Dto, __metadata("design:paramtypes", [Object])], ResponseDto);
exports.ResponseDto = ResponseDto;