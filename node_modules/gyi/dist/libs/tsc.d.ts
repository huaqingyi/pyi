/// <reference types="node" />
import { LibsBase } from "./libsbase";
import * as tsc from 'gulp-typescript';
export declare class TSC extends LibsBase {
    /**
     * ts component build to js
     * @param src watch application *.ts
     * @param dest build success copy to dirname
     * @param ts gulp-typescript tools
     * @param tsconfig gulp-typescript ts.Setting object or tsconfig and tsconfig path
     */
    runtime(src?: string, dest?: string, ts?: any, tsconfig?: string | tsc.Settings): Promise<NodeJS.ReadWriteStream>;
}
