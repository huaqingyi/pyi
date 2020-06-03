import 'reflect-metadata';
import { src, dest, series } from 'gulp';
import { join } from 'path';
import { createProject, Settings } from 'gulp-typescript';
import { get } from 'node-emoji';
import { red, green } from 'colors';
import * as sourcemaps from 'gulp-sourcemaps';
import merge from 'merge2';

export class PYIBuilder {
    public outputs: string[];

    constructor(
        private srcpath: string,
        private destpath: string,
        private setting: Settings,
    ) {
        this.outputs = [];
    }

    public compile() {
        let tsResult: any = src([
            join(this.srcpath, '**/*.ts'),
            join(this.srcpath, '**/*.tsx'),
            join(this.srcpath, '**/*.js'),
            join(this.srcpath, '**/*.jsx'),
        ]);

        if (this.setting.sourceMap === true) {
            tsResult = tsResult.pipe(sourcemaps.init());
        }

        tsResult = tsResult.pipe(createProject(this.setting)());

        const ms = [];
        if (this.setting.declaration === true) { ms.push(tsResult.dts.pipe(dest(this.destpath))); }

        let js = tsResult.js;
        if (this.setting.sourceMap === true) {
            js = js.pipe(sourcemaps.write('./sourcemaps'));
        }

        ms.push(js.pipe(dest((file) => {
            const output = join(this.destpath, file.relative.replace(
                new RegExp(`${file.stem}${file.extname}$`, 'gi'), ''
            ));
            const path = join(output, `${file.stem}${file.extname}`);
            if (require.cache[path]) {
                delete require.cache[path];
            }
            console.log(`${get('kiss')}  ${green(`${path}`)}`);
            this.outputs.push(path);
            return this.destpath;
        })));
        /**
         * merge result
         */
        return merge(ms);
    }

    public async build() {
        await new Promise((r) => {
            series(this.compile.bind(this), r)((err) => {
                console.log(red(err));
            });
        });
        return this.outputs;
    }
}
