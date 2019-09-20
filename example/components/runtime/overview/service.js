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
const database_1 = require("../components/database");
const model_1 = require("./model");
let Service = class Service extends src_1.PYIService {
    async testFindAll() {
        return await this.db.table(model_1.Model).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }
    async testQuery() {
        const [data] = await this.db.instance().query(`SELECT * FROM test`);
        return data;
    }
};
__decorate([
    src_1.autowired,
    __metadata("design:type", database_1.DataBase)
], Service.prototype, "db", void 0);
Service = __decorate([
    src_1.Service
], Service);
exports.Service = Service;

//# sourceMappingURL=../sourcemaps/overview/service.js.map
