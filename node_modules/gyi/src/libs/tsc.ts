import { LibsBase } from "./libsbase";
import gulp from "gulp";
import * as sourcemaps from 'gulp-sourcemaps';
import * as tsc from 'gulp-typescript';
import { join } from "path";
import merge from 'merge2';

export class TSC extends LibsBase {
    /**
     * ts component build to js
     * @param src watch application *.ts
     * @param dest build success copy to dirname
     * @param ts gulp-typescript tools
     * @param tsconfig gulp-typescript ts.Setting object or tsconfig and tsconfig path
     */
    async runtime(
        src?: string, dest?: string,
        ts?: any, tsconfig?: string | tsc.Settings
    ): Promise<NodeJS.ReadWriteStream> {
        /**
         * created gulp pipe
         */
        if (src) this.gulp = gulp.src(src);
        try {
            /**
             * build runtime
             */
            const g: NodeJS.ReadWriteStream = (this.gulp as any);
            if (!ts) ts = tsc;
            if (!tsconfig) tsconfig = join(process.cwd(), 'tsconfig.json');
            if (!dest) dest = './dist';
            const tsResult = g.pipe(sourcemaps.init())
                .pipe(ts.createProject(tsconfig)());
            /**
             * merge result
             */
            return merge([
                tsResult.dts.pipe(gulp.dest(dest)),
                tsResult.js.pipe(sourcemaps.write("./sourcemaps"))
                    .pipe(gulp.dest(dest))
            ]);
        } catch (err) {
            /**
             * try error
             */
            return await Promise.reject(err);
        }
    }
}
