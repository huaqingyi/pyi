#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const args_1 = __importDefault(require("args"));
const fs_1 = require("fs");
const colors_1 = require("colors");
const moment_1 = __importDefault(require("moment"));
const request_1 = __importDefault(require("request"));
const unzip_1 = require("unzip");
const fs_extra_1 = require("fs-extra");
const child_process_1 = require("child_process");
args_1.default.command('create', 'create new project ...', async (name, sub, options) => {
    if (!sub[0]) {
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
    const pdir = path_1.join(process.cwd(), sub[0]);
    await fs_extra_1.copy(packdir, pdir);
    await console.log(colors_1.green('copy success ...'));
    return await child_process_1.exec(`cd ${pdir} && npm i`);
});
args_1.default.parse(process.argv);

//# sourceMappingURL=../sourcemaps/cli/index.js.map
