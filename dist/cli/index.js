#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const args_1 = __importDefault(require("args"));
args_1.default.command('create', 'create new project ...', (name, sub, options) => {
    console.log('create');
}).command('run', 'run appliaction ...', (name, sub, options) => {
    child_process_1.fork(path_1.join(__dirname, 'run.js'), process.argv.slice(3, process.argv.length), {
        stdio: 'inherit'
    });
});
args_1.default.parse(process.argv);

//# sourceMappingURL=../sourcemaps/cli/index.js.map
