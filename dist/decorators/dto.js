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
const core_1 = require("../core");
const colors_1 = require("colors");
function Dto(props) {
    if (props._base && props._base() === PYIDto) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.Dto = Dto;
class PYIDto extends core_1.PYICore {
    static _base() {
        return PYIDto;
    }
    throws(errors) {
        console.log(colors_1.red(JSON.stringify(errors)));
    }
}
exports.PYIDto = PYIDto;
let ResponseDto = class ResponseDto extends PYIDto {
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
ResponseDto = __decorate([
    Dto,
    __metadata("design:paramtypes", [Object])
], ResponseDto);
exports.ResponseDto = ResponseDto;

//# sourceMappingURL=../sourcemaps/decorators/dto.js.map
