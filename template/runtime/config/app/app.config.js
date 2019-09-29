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
const development_1 = require("./development");
const production_1 = require("./production");
const path_1 = require("path");
/**
 * 这里可以通过注解注入
 * 也可以直接赋值
 */
let AppConfiguration = class AppConfiguration extends pyi_1.PYIAutoAppConfiguration {
    /**
     * 赋值注入
     */
    // public usemode: AppConfigOption;
    constructor(config, props) {
        super(config, props);
        this.development.output = path_1.join(config.entry, '../runtime');
        this.production.output = path_1.join(config.entry, '../runtime');
        /**
         * 赋值注入
         */
        // this.usemode = new AppConfigOption();
    }
};
__decorate([
    pyi_1.autowired,
    __metadata("design:type", development_1.Development)
], AppConfiguration.prototype, "development", void 0);
__decorate([
    pyi_1.autowired,
    __metadata("design:type", production_1.Production)
], AppConfiguration.prototype, "production", void 0);
AppConfiguration = __decorate([
    pyi_1.Configuration,
    __metadata("design:paramtypes", [pyi_1.AppConfigOption, Object])
], AppConfiguration);
exports.AppConfiguration = AppConfiguration;

//# sourceMappingURL=../../sourcemaps/config/app/app.config.js.map
