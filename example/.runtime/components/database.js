"use strict";

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __metadata = this && this.__metadata || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

const src_1 = require("/Users/yihuaqing/Desktop/yihq/pyi/src");

const sequelize_typescript_1 = require("sequelize-typescript");

const database_config_1 = require("../config/database.config"); // @Component<SequelizeOptions>({
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


let Database = class Database extends src_1.PYIComponent {
  constructor() {
    super();
    console.log(this.props);
    this.database = new sequelize_typescript_1.Sequelize(this.props);
  }

  i() {
    return this.database;
  }

  table(model) {
    this.database.addModels([model]);
    return this.database.model(model);
  }

  test() {
    return 'test component ...';
  }

};

__decorate([src_1.autoconnect, __metadata("design:type", database_config_1.DataBaseConfiguration)], Database.prototype, "props", void 0);

Database = __decorate([src_1.Component, __metadata("design:paramtypes", [])], Database);
exports.Database = Database;