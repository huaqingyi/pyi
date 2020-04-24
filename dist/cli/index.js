#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const colors_1 = require("colors");
const moment_1 = __importDefault(require("moment"));
const request_1 = __importDefault(require("request"));
const unzip_1 = require("unzip");
const fs_extra_1 = require("fs-extra");
const child_process_1 = require("child_process");
const yicommand_1 = require("yicommand");
const pyi_builder_1 = require("./pyi.builder");
const application_1 = require("./application");
let TestCommand = class TestCommand {
    async created(path) {
        if (!path) {
            return await console.log(colors_1.red('not have project name ...'));
        }
        await console.log(colors_1.green('download https://github.com/huaqingyi/pyi-template/archive/master.zip ...'));
        const time = moment_1.default().format('YYYY-MM-DD HH');
        const pack = path_1.join(__dirname, `../.temp/${time}.zip`);
        if (!fs_1.existsSync(pack)) {
            console.log(colors_1.green('redownload https://github.com/huaqingyi/pyi-template/archive/master.zip ...'));
            await new Promise((r) => fs_extra_1.remove(path_1.dirname(pack), r));
            await new Promise((r) => fs_extra_1.mkdir(path_1.dirname(pack), r));
            await new Promise((r) => request_1.default('http://github.com/huaqingyi/pyi-template/archive/master.zip')
                .pipe(fs_1.createWriteStream(pack)).on('close', r));
        }
        await console.log(colors_1.green('download success ...'));
        const unzipdir = path_1.join(path_1.dirname(pack), 'resource');
        const packdir = path_1.join(unzipdir, 'pyi-template-master');
        await new Promise((r) => fs_1.createReadStream(pack)
            .pipe(unzip_1.Extract({ path: unzipdir })).on('close', r));
        await console.log(colors_1.green('unzip success ...'));
        const pdir = path_1.join(process.cwd(), path);
        await fs_extra_1.copy(packdir, pdir);
        await console.log(colors_1.green('copy success ...'));
        return await child_process_1.exec(`cd ${pdir} && npm i`);
    }
    async start(path) {
        if (!path) {
            path = path_1.join(process.cwd(), '.');
        }
        else {
            path = path_1.join(process.cwd(), path.replace(process.cwd(), ''));
        }
        const app = new application_1.PYIApplication();
        const builder = new pyi_builder_1.PYIBuilder(app, [
            path_1.join(path, '**/*.ts'),
            path_1.join(path, '**/*.tsx'),
            path_1.join(path, '**/*.js'),
            path_1.join(path, '**/*.jsx'),
        ], path_1.join(path, '.runtime'));
        await builder.build();
    }
};
__decorate([
    yicommand_1.Execute('create <path>'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestCommand.prototype, "created", null);
__decorate([
    yicommand_1.Execute('start [path]'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestCommand.prototype, "start", null);
TestCommand = __decorate([
    yicommand_1.Command({
        context: 'PYI Framework ...',
        version: require('../../package.json').version
    })
], TestCommand);
exports.TestCommand = TestCommand;

//# sourceMappingURL=../sourcemaps/cli/index.js.map
