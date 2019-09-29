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
var TestService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const pyi_1 = require("pyi");
const database_1 = require("../components/database");
const test_model_1 = require("../model/test.model");
let TestService = TestService_1 = class TestService extends pyi_1.PYIService {
    async testFindAll() {
        // tslint:disable-next-line:max-classes-per-file
        return pyi_1.PYIExecption(class extends TestService_1 {
            async throws() {
                // throw new Error('不开心 ...');
                return await this.db.table(test_model_1.Test).findAll().then((row) => {
                    return row.map((resp) => resp.toJSON());
                });
            }
        });
        // return await this.db.table(Test).findAll().then((row) => {
        //     return row.map((resp) => resp.toJSON());
        // });
    }
    async testQuery() {
        let data = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", database_1.DataBase)
], TestService.prototype, "db", void 0);
__decorate([
    pyi_1.throws,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestService.prototype, "testFindAll", null);
TestService = TestService_1 = __decorate([
    pyi_1.Service
], TestService);
exports.TestService = TestService;

//# sourceMappingURL=../sourcemaps/service/test.service.js.map
