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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PYIBuilder = void 0;
require("reflect-metadata");
const gulp_1 = require("gulp");
const path_1 = require("path");
const gulp_typescript_1 = require("gulp-typescript");
const node_emoji_1 = require("node-emoji");
const colors_1 = require("colors");
const sourcemaps = __importStar(require("gulp-sourcemaps"));
const merge2_1 = __importDefault(require("merge2"));
class PYIBuilder {
    constructor(srcpath, destpath, setting) {
        this.srcpath = srcpath;
        this.destpath = destpath;
        this.setting = setting;
        this.outputs = [];
    }
    compile() {
        let tsResult = gulp_1.src([
            path_1.join(this.srcpath, '**/*.ts'),
            path_1.join(this.srcpath, '**/*.tsx'),
            path_1.join(this.srcpath, '**/*.js'),
            path_1.join(this.srcpath, '**/*.jsx'),
        ]);
        if (this.setting.sourceMap === true) {
            tsResult = tsResult.pipe(sourcemaps.init());
        }
        tsResult = tsResult.pipe(gulp_typescript_1.createProject(this.setting)());
        const ms = [];
        if (this.setting.declaration === true) {
            ms.push(tsResult.dts.pipe(gulp_1.dest(this.destpath)));
        }
        let js = tsResult.js;
        if (this.setting.sourceMap === true) {
            js = js.pipe(sourcemaps.write('./sourcemaps'));
        }
        ms.push(js.pipe(gulp_1.dest((file) => {
            const output = path_1.join(this.destpath, file.relative.replace(new RegExp(`${file.stem}${file.extname}$`, 'gi'), ''));
            const path = path_1.join(output, `${file.stem}${file.extname}`);
            if (require.cache[path]) {
                delete require.cache[path];
            }
            console.log(`${node_emoji_1.get('kiss')}  ${colors_1.green(`${path}`)}`);
            this.outputs.push(path);
            return this.destpath;
        })));
        /**
         * merge result
         */
        return merge2_1.default(ms);
    }
    async build() {
        await new Promise((r) => {
            gulp_1.series(this.compile.bind(this), r)((err) => {
                console.log(colors_1.red(err));
            });
        });
        return this.outputs;
    }
}
exports.PYIBuilder = PYIBuilder;

//# sourceMappingURL=../sourcemaps/cli/builder.js.map
