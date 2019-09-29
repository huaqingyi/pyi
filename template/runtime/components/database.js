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
const sequelize_typescript_1 = require("sequelize-typescript");
const database_config_1 = require("../config/database/database.config");
// @Component<SequelizeOptions>({
//     dialect: 'mysql',
//     replication: {
//         read: [
//             { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//         ],
//         write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//     },
//     pool: {
//         max: 20,
//         idle: 60 * 1000
//     }
// })
let DataBase = class DataBase extends pyi_1.PYIComponent {
    constructor(props) {
        super(props);
        this.db = new sequelize_typescript_1.Sequelize(props);
    }
    instance() {
        return this.db;
    }
    table(model) {
        this.db.addModels([model]);
        return this.db.model(model);
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", database_config_1.DataBaseConfiguration)
], DataBase.prototype, "props", void 0);
DataBase = __decorate([
    pyi_1.Component,
    __metadata("design:paramtypes", [Object])
], DataBase);
exports.DataBase = DataBase;

//# sourceMappingURL=../sourcemaps/components/database.js.map
