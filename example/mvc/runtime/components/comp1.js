"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
let Comp1 = class Comp1 extends src_1.PYIComponent {
    test() {
        return 'Hello Component1 ...';
    }
};
Comp1 = __decorate([
    src_1.Component
], Comp1);
exports.Comp1 = Comp1;

//# sourceMappingURL=../sourcemaps/components/comp1.js.map
