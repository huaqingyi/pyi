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
let DataBaseConfiguration = class DataBaseConfiguration extends src_1.PYIAutoConfiguration {
    constructor() {
        super();
        this.default = {};
        this.default.dialect = 'mysql';
        this.default.replication = {
            read: [
                { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
            ],
            write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
        };
        this.default.pool = {
            max: 20,
            idle: 60 * 1000
        };
    }
};
DataBaseConfiguration = __decorate([
    src_1.Configuration,
    __metadata("design:paramtypes", [])
], DataBaseConfiguration);
exports.DataBaseConfiguration = DataBaseConfiguration;

//# sourceMappingURL=../../../sourcemaps/src/config/database/database.config.js.map