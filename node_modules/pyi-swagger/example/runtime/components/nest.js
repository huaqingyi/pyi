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
const pyi_1 = require("pyi");
const comp_1 = require("./comp");
const comp1_1 = require("./comp1");
let Nest = class Nest extends pyi_1.PYIComponent {
    merge() {
        return [
            this.comp.test(),
            this.comp1.test()
        ];
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", comp_1.Comp)
], Nest.prototype, "comp", void 0);
__decorate([
    pyi_1.autowired,
    __metadata("design:type", comp1_1.Comp1)
], Nest.prototype, "comp1", void 0);
Nest = __decorate([
    pyi_1.Component
], Nest);
exports.Nest = Nest;

//# sourceMappingURL=../sourcemaps/components/nest.js.map
