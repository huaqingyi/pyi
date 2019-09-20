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
const src_1 = require("../../../../src");
const service_1 = require("./service");
let Controller = class Controller extends src_1.PYIController {
    async index() {
        console.log(this.service);
        return await 'Hello World ...';
    }
    async test() {
        const data = await this.service.testFindAll();
        console.log(`findAll: `, data);
        return data;
        const data1 = await this.service.testQuery();
        console.log(`test query: `, data1);
        return data1;
        return await 'Hello World For Test ...';
    }
};
__decorate([
    src_1.autowired,
    __metadata("design:type", service_1.Service)
], Controller.prototype, "service", void 0);
__decorate([
    src_1.RequestMapping({
        prefix: '/'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Controller.prototype, "index", null);
__decorate([
    src_1.RequestMapping({
        prefix: '/test',
        methods: [src_1.RequestMappingMethod.GET, src_1.RequestMappingMethod.POST]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Controller.prototype, "test", null);
Controller = __decorate([
    src_1.Controller
], Controller);
exports.Controller = Controller;

//# sourceMappingURL=../sourcemaps/overview/test.controller.js.map
