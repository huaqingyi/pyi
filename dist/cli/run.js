"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node/register");
const path_1 = require("path");
const lodash_1 = require("lodash");
const colors_1 = require("colors");
const gulp_1 = require("gulp");
const gulp_sourcemaps_1 = require("gulp-sourcemaps");
const gulp_typescript_1 = require("gulp-typescript");
const merge2_1 = __importDefault(require("merge2"));
const gulp_install_1 = __importDefault(require("gulp-install"));
const gulp_nodemon_1 = __importDefault(require("gulp-nodemon"));
const rootpath = path_1.join(process.cwd(), process.argv[2]);
const fileinfo = (process.argv[2].split('/').pop() || '').split('.');
fileinfo.pop();
(async () => {
    const packs = await Promise.resolve().then(() => __importStar(require(rootpath)));
    const [Application] = lodash_1.filter(packs, (comp) => comp.isApplication || false);
    const app = new Application();
    // tslint:disable-next-line: no-shadowed-variable
    app.runtime(async ({ config, watcher, starter }) => {
        console.log(colors_1.yellow('import project all file success ...'));
        if (config.runtime === true) {
            if (config.watch === true) {
                watcher.on('all', async (type, path) => {
                    console.log(`${colors_1.yellow(type)}: ${colors_1.green(path)}`);
                    const tsr = gulp_1.src(path).pipe(gulp_sourcemaps_1.init()).pipe(gulp_typescript_1.createProject(config.compilerOptions)());
                    const projectpath = path_1.dirname(rootpath);
                    const filepath = path_1.dirname(path);
                    const outpath = filepath.replace(projectpath, config.output);
                    const tscr = await merge2_1.default([
                        tsr.dts.pipe(gulp_1.dest(outpath)),
                        tsr.js.pipe(gulp_sourcemaps_1.write('./sourcemaps'))
                            .pipe(gulp_1.dest(outpath))
                    ]).pipe(gulp_install_1.default());
                    return await tscr;
                });
            }
            else {
                watcher.close();
            }
            const tstask = gulp_1.src([
                ...lodash_1.map(config.resolve.extensions, (ext) => path_1.join(config.entry, `**/*${ext}`)),
                rootpath
            ]);
            const tsResult = tstask.pipe(gulp_sourcemaps_1.init()).pipe(gulp_typescript_1.createProject(config.compilerOptions)());
            const ts = await merge2_1.default([
                tsResult.dts.pipe(gulp_1.dest(config.output)),
                tsResult.js.pipe(gulp_sourcemaps_1.write('./sourcemaps'))
                    .pipe(gulp_1.dest(config.output))
            ]).on('end', async () => {
                console.log(colors_1.yellow('build success'));
                await new Promise((r) => setTimeout(r, 2000));
                gulp_nodemon_1.default({
                    script: path_1.join(__dirname, 'starter.js'),
                    args: [
                        path_1.join(config.output, [...fileinfo, 'js'].join('.')),
                        ...process.argv.slice(3, process.argv.length)
                    ],
                    ext: config.resolve.extensions.join(' '),
                    watch: [
                        ...lodash_1.map(config.resolve.extensions, (ext) => path_1.join(config.entry, `**/*${ext}`)),
                        rootpath
                    ],
                    stdin: true,
                    stdout: true
                });
            }).pipe(gulp_install_1.default());
            return await ts;
        }
        else {
            if (config.watch === true) {
                watcher.close();
                gulp_nodemon_1.default({
                    script: path_1.join(__dirname, 'starter.js'),
                    args: [rootpath, ...process.argv.slice(3, process.argv.length)],
                    ext: config.resolve.extensions.join(' '),
                    watch: [
                        ...lodash_1.map(config.resolve.extensions, (ext) => path_1.join(config.entry, `**/*${ext}`)),
                        rootpath
                    ],
                    stdin: true,
                    stdout: true
                });
            }
            else {
                starter();
            }
        }
    });
})();

//# sourceMappingURL=../sourcemaps/cli/run.js.map
