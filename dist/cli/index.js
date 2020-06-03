#!/usr/bin / env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCommand = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const colors_1 = require("colors");
const moment_1 = __importDefault(require("moment"));
const request_1 = __importDefault(require("request"));
const unzip_1 = require("unzip");
const fs_extra_1 = require("fs-extra");
const child_process_1 = require("child_process");
const yicommand_1 = require("yicommand");
const typescript_1 = __importDefault(require("typescript"));
const lodash_1 = require("lodash");
const builder_1 = require("./builder");
const application_1 = require("../decorators/application");
let TestCommand = /** @class */ (() => {
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
        async start(application) {
            if (fs_1.statSync(application).isFile()) {
                const Application = lodash_1.find(await Promise.resolve().then(() => __importStar(require(path_1.join(process.cwd(), application)))), ({ _base }) => _base && _base() === application_1.PYIApplication);
                if (!Application) {
                    throw new Error('is not bootstrap application ...');
                }
                else {
                    const path = path_1.dirname(path_1.join(process.cwd(), application));
                    const { config } = typescript_1.default.readConfigFile(path_1.join(`${path}`, 'tsconfig.json'), typescript_1.default.sys.readFile);
                    const builder = new builder_1.PYIBuilder(path, path_1.join(path, '.runtime'), config);
                    await builder.build();
                    // const app = new Application();
                    // app.setResource(builder.outputs);
                    // await app.bootstrap();
                }
            }
            else {
                throw new Error('is not bootstrap file ...');
            }
        }
    };
    __decorate([
        yicommand_1.Execute('create <path>'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], TestCommand.prototype, "created", null);
    __decorate([
        yicommand_1.Execute('start [application]'),
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
    return TestCommand;
})();
exports.TestCommand = TestCommand;

//# sourceMappingURL=../sourcemaps/cli/index.js.map
