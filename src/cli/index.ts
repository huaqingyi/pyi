#!/usr/bin/env node

import 'ts-node/register';
import { join, dirname } from 'path';
import { filter, map } from 'lodash';
import { PYIApplication } from '../decorators';
import { yellow, green } from 'colors';
import { src, dest } from 'gulp';
import { init, write } from 'gulp-sourcemaps';
import { createProject } from 'gulp-typescript';
import merge from 'merge2';
import install from 'gulp-install';
import nodemon from 'gulp-nodemon';

const rootpath = join(process.cwd(), process.argv[2]);
const fileinfo = (process.argv[2].split('/').pop() || '').split('.');
fileinfo.pop();

(async () => {
    const packs = await import(rootpath);
    const [Application] = filter(packs, (comp) => comp.isApplication || false);
    const app: PYIApplication = new Application();
    // tslint:disable-next-line: no-shadowed-variable
    app.runtime(async ({ config, watcher, starter }) => {
        console.log(yellow('import project all file success ...'));
        if (config.runtime === true) {
            if (config.watch === true) {
                watcher.on('all', async (type, path) => {
                    console.log(`${yellow(type)}: ${green(path)}`);
                    const tsr = src(path).pipe(init()).pipe(createProject(config.compilerOptions)());
                    const projectpath = dirname(rootpath);
                    const filepath = dirname(path);
                    const outpath = filepath.replace(projectpath, config.output);
                    const tscr = await merge([
                        tsr.dts.pipe(dest(outpath)),
                        tsr.js.pipe(write('./sourcemaps'))
                            .pipe(dest(outpath))
                    ]).pipe(install());
                    return await tscr;
                });
            } else {
                watcher.close();
            }

            const tstask = src([
                ...map(config.resolve.extensions, (ext) => join(config.entry, `**/*${ext}`)),
                rootpath
            ]);
            const tsResult = tstask.pipe(init()).pipe(createProject(config.compilerOptions)());

            const ts = await merge([
                tsResult.dts.pipe(dest(config.output)),
                tsResult.js.pipe(write('./sourcemaps'))
                    .pipe(dest(config.output))
            ]).on('end', async () => {
                console.log(yellow('build success'));
                await new Promise((r) => setTimeout(r, 2000));

                nodemon({
                    script: join(__dirname, 'starter.js'),
                    args: [
                        join(config.output, [...fileinfo, 'js'].join('.')),
                        ...process.argv.slice(3, process.argv.length)
                    ],
                    ext: config.resolve.extensions.join(' '),
                    watch: [
                        ...map(config.resolve.extensions, (ext) => join(config.entry, `**/*${ext}`)),
                        rootpath
                    ],
                    stdin: true,
                    stdout: true
                });
            }).pipe(install());

            return await ts;
        } else {
            if (config.watch === true) {
                watcher.close();
                nodemon({
                    script: join(__dirname, 'starter.js'),
                    args: [rootpath, ...process.argv.slice(3, process.argv.length)],
                    ext: config.resolve.extensions.join(' '),
                    watch: [
                        ...map(config.resolve.extensions, (ext) => join(config.entry, `**/*${ext}`)),
                        rootpath
                    ],
                    stdin: true,
                    stdout: true
                });
            } else {
                starter();
            }
        }
    });
})();
