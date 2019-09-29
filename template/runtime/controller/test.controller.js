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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TestController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("pyi");
const test_service_1 = require("../service/test.service");
const nest_1 = require("../components/nest");
const test_vo_1 = require("./../vo/test.vo");
let TestController = TestController_1 = class TestController extends pyi_1.PYIController {
    index() {
        // tslint:disable-next-line:max-classes-per-file
        return pyi_1.PYIExecption(class extends TestController_1 {
            async throws() {
                console.log(this.service);
                console.log(this.nest.merge());
                // {"err":false,"data":"Hello PYI ..."}
                return await 'Hello PYI ...';
            }
        });
    }
    test(ctx, req, res, params, body) {
        // tslint:disable-next-line:max-classes-per-file
        return pyi_1.PYIExecption(class extends TestController_1 {
            async throws() {
                this.errno = 1004;
                this.errmsg = 'service query findAll sql err.';
                let data = await this.service.testFindAll();
                // {"err":true,"data":{},"errno":1004,"errmsg":"service query findAll sql err."}
                console.log('all', data);
                this.errno = 1005;
                this.errmsg = 'service query test sql err.';
                data = await this.service.testQuery();
                // {"err":true,"data":{},"errno":1005,"errmsg":"service query test sql err."}
                this.errno = 1006;
                this.errmsg = 'service query test sql success try err.';
                throw new Error('test ...');
                // {"err":true,"data":{},"errno":1006,"errmsg":"service query test sql success try err."}
                return data;
            }
        });
    }
    show() {
        return 'test show ...';
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", test_service_1.TestService)
], TestController.prototype, "service", void 0);
__decorate([
    pyi_1.autowired,
    __metadata("design:type", nest_1.Nest)
], TestController.prototype, "nest", void 0);
__decorate([
    pyi_1.RequestMapping({
        prefix: '/'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", test_vo_1.TestVo)
], TestController.prototype, "index", null);
__decorate([
    pyi_1.RequestMapping({
        prefix: '/test',
        methods: [pyi_1.RequestMappingMethod.GET, pyi_1.RequestMappingMethod.POST]
    }),
    __param(0, pyi_1.Ctx()),
    __param(1, pyi_1.Req()),
    __param(2, pyi_1.Res()),
    __param(3, pyi_1.Params()),
    __param(4, pyi_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object]),
    __metadata("design:returntype", test_vo_1.TestVo)
], TestController.prototype, "test", null);
__decorate([
    pyi_1.RequestMapping({
        prefix: '/show'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TestController.prototype, "show", null);
TestController = TestController_1 = __decorate([
    pyi_1.Controller
], TestController);
exports.TestController = TestController;

//# sourceMappingURL=../sourcemaps/controller/test.controller.js.map
