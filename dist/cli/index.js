#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const args_1 = __importDefault(require("args"));
const gulp_1 = require("gulp");
const gulp_install_1 = __importDefault(require("gulp-install"));
const fs_1 = require("fs");
const colors_1 = require("colors");
args_1.default.command('create', 'create new project ...', async (name, sub, options) => {
    const copy = async (srcpath, destpath) => {
        const task = gulp_1.src(srcpath);
        return await new Promise((r) => {
            task.pipe(gulp_1.dest(destpath)).on('end', r).pipe(gulp_install_1.default());
        });
    };
    if (sub.length === 1) {
        const [project] = sub;
        const path = path_1.join(process.cwd(), project);
        await copy(path_1.join(__dirname, '../../template/**/*.*'), path);
        let config = fs_1.readFileSync(path_1.join(__dirname, '../../template/package.json'), { encoding: 'utf-8' }).toString();
        config = config.replace(`"name": "pyi",`, `"name": "${project}",`);
        fs_1.writeFileSync(path_1.join(path_1.join(process.cwd(), project), 'package.json'), config, { encoding: 'utf-8' });
        console.log(colors_1.green('create project files success ...'));
        console.log(colors_1.green('use: '));
        console.log(colors_1.yellow(`    cd ${project} && npm i`));
    }
    else {
        console.log(colors_1.red('input project name ...'));
    }
}).command('run', 'run appliaction ...', () => {
    child_process_1.fork(path_1.join(__dirname, 'run.js'), process.argv.slice(3, process.argv.length), {
        stdio: 'inherit'
    });
});
args_1.default.parse(process.argv);

//# sourceMappingURL=../sourcemaps/cli/index.js.map
