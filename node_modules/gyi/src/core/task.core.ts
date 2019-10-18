import { GYI } from "./gyi";
import Undertaker from 'undertaker';
import { map, find } from 'lodash';
import gulp, { series as seriesFun, parallel as parallelFun, watch } from 'gulp';
import * as libs from '../libs';
import { LibsBase } from "../libs";

export interface TaskOption {
    src?: string;
    dest?: string;
    series?: Undertaker.Task[];
    parallel?: Undertaker.Task[];
    injectable?: { [x: string]: any };
}

export interface TaskConfig {
    option?: TaskOption;
    inject?: string[];
}

export class TaskCore extends GYI {

    protected libs!: LibsBase[];

    constructor() {
        super();
        this.libs = map(libs, lib => <any>lib);
    }

    async injectTask(name: string, key: string, option: TaskConfig) {
        if (!this.store[name]) this.store[name] = [];
        this.store[name].push({ key, option });
    }

    async makeTask(mode: Function) {
        const { name } = mode;
        const instance = new (mode as any);

        await Promise.all(map(this.store[name], async config => {
            const { key, option } = config;
            let exec = (async () => {
                let end: NodeJS.ReadWriteStream;
                let destEnd: NodeJS.ReadWriteStream | null = null;
                if (option.option) {
                    const { src, dest } = option.option;
                    if (src) end = await gulp.src(src);
                    if (dest) destEnd = gulp.dest(dest);
                }
                let inject: any[] = [];
                if (option.inject && option.inject.length > 0) {
                    inject = map(option.inject, lib => {
                        let LibInstance: any = find(this.libs, item => (item as any).name === lib.name);
                        if (LibInstance.name === 'Gulp') return gulp;
                        if (!LibInstance) {
                            if (option.option && option.option.injectable) {
                                const { injectable } = option.option;
                                if (injectable && injectable[lib.name]) return new injectable[lib.name](end);
                                return injectable;
                            }
                            return undefined;
                        }
                        return new LibInstance(end);
                    });
                }
                end = await instance[key].apply(instance, inject);
                if (end && destEnd !== null) end = await end.pipe(destEnd);
            }).bind(this);

            if (!option.option) return await gulp.task(key, exec);

            const { series, parallel } = option.option;

            if (series) {
                return await gulp.task(key, seriesFun(...series.concat([exec])));
            } else if (parallel) {
                return await gulp.task(key, parallelFun(...parallel.concat([exec])));
            } else if (series && parallel) {
                return new Error(`series not have parallel ...`);
            }
            return await gulp.task(key, exec);
        }));
    }
}