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
var Application_1;
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("pyi");
const schedule_1 = require("./components/schedule");
let Application = Application_1 = class Application extends pyi_1.PYIApplication {
    constructor() {
        super();
        this.scheduleWork();
    }
    static main(args) {
        /**
         * 指定项目路径
         */
        Application_1.runtime(__dirname);
    }
    async scheduleWork() {
        await this.schedule.test();
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", schedule_1.Schedule)
], Application.prototype, "schedule", void 0);
Application = Application_1 = __decorate([
    pyi_1.PYIBootstrap,
    __metadata("design:paramtypes", [])
], Application);
exports.Application = Application;

//# sourceMappingURL=sourcemaps/application.js.map
