import { PYIBuilder } from './builder';
import { PYICore, PYIApp } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { join } from 'path';
import { Settings } from 'gulp-typescript';
import { isString } from 'lodash';
import Typescript from 'typescript';

/**
 * 继承 Koa 主类
 */
export class PYIApplication<
    StateT = DefaultState,
    CustomT = DefaultContext
    > extends Koa<StateT, CustomT> {
    [x: string]: any;
    public static __proto__: any;
    public static _i: PYIApplication;

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base(): PYIApp {
        return PYIApplication;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _singleton(
        projectPath: string,
        setting?: Settings | string,
        ...props: any
    ) {
        if (!this._i) {
            this._i = new this(projectPath, setting);
        }
        return this._i;
    }

    public readonly mode!: string;
    public readonly path!: string;

    protected setting: Settings;

    constructor(
        protected projectPath: string,
        setting?: Settings | string,
    ) {
        super();
        if (!setting) {
            setting = join(process.cwd(), 'tsconfig.json');
        }
        const { config } = Typescript.readConfigFile(setting as string, Typescript.sys.readFile);
        this.setting = isString(setting) ? config.compilerOptions : setting;
    }

    public async bootstrap() {
        if (!this.projectPath) {
            this.projectPath = join(process.cwd(), '.');
        } else {
            this.projectPath = join(process.cwd(), this.projectPath.replace(process.cwd(), ''));
        }
        let mode: string = 'development';
        if (process.env.NODE_ENV) { mode = process.env.NODE_ENV; }

        const builder = new PYIBuilder(
            this.setting,
            this, mode, this.projectPath,
            join(this.projectPath, '..', '.runtime')
        );

        await builder.build();
    }
}
