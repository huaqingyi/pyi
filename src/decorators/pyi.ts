import { Application } from '../core';
import { PYIChokidar, Maker } from '../libs';
import { green } from 'colors';
import { useKoaServer } from 'routing-controllers';

export interface PYIApplicationImpl {
    [x: string]: any;
    onInit?: () => any;
    didLoad?: () => any;
    onInitComponent?: () => any;
    didInitComponent?: () => any;
    didMakeConfig?: () => any;
    didRuntime?: () => any;
}

export abstract class PYIApplication extends Application implements PYIApplicationImpl {
    public static _pyi: () => any;
    public static _root() {
        return PYIApplication;
    }

    public async run(path: string | string[]) {
        const { onInit, didLoad, onInitComponent, didInitComponent, didMakeConfig } = this;
        await console.log(green(`start load project files ...`));
        // tslint:disable-next-line:no-unused-expression
        onInit && await onInit.apply(this);
        const chokidar: PYIChokidar = await PYIChokidar.runtime(path, this.mode).setup(this);
        await console.log(green(`load end project files success ...`));
        // tslint:disable-next-line:no-unused-expression
        didLoad && await didLoad.apply(this);
        const comps = await chokidar.comps;
        const config = await chokidar.appconfig;
        this.config = config;
        await console.log(green(`will load app to all components and config ...`));
        // tslint:disable-next-line:no-unused-expression
        onInitComponent && await onInitComponent.apply(this);
        await console.log(green(`did load app to all components success ...`));
        // tslint:disable-next-line:no-unused-expression
        didInitComponent && await didInitComponent.apply(this);
        await Maker.runtime(this).setup(comps);
        await console.log(green(`make components to app config success ...`));
        // tslint:disable-next-line:no-unused-expression
        didMakeConfig && await didMakeConfig.apply(this);
        this.config.controllers = (this.config.controllers || []).concat(this.controllers);
        this.config.middlewares = (this.config.middlewares || []).concat(this.middlewares);
        this.config.interceptors = (this.config.interceptors || []).concat(this.interceptors);
        if (this.config.enableDto === true) { this.config.defaultErrorHandler = false; }
        const app = useKoaServer(this, {
            ...(this.config as any),
            defaultErrorHandler: false
        });
        this._setup.next(this);
        return app;
    }

    [x: string]: any;
}

export function PYIBootstrap(target: any, key?: string) {
    let mode: string = 'development';
    if (process.env.NODE_ENV) { mode = process.env.NODE_ENV; }
    target.prototype.mode = mode;
}
