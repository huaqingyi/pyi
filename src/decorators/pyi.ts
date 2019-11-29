import { PYIComponent } from './component';
import { PYIController, PYIMiddleware, PYIInterceptor } from './controller';
import Koa from 'koa';
import { PYIChokidar, Maker } from '../libs';
import { green } from 'colors';
import { useKoaServer } from 'routing-controllers';
import bodyParser from 'koa-bodyparser';
import { PYIAutoAppConfiguration } from './configuration';
import { PYIDto } from './dto';
import { PYICoreApp } from '../core';

export interface PYIApplicationImpl {
    [x: string]: any;
    onInit?: () => any;
    didLoad?: () => any;
    onInitComponent?: () => any;
    didInitComponent?: () => any;
    didMakeConfig?: () => any;
    didRuntime?: () => any;
}

export interface PYIExecptionAsync {
    Vo?: PYICoreApp;
    body: any | Promise<any>;
    execption: PYICoreApp;
}

export abstract class PYIApplication extends Koa implements PYIApplicationImpl {
    public static _pyi: () => any;
    public static _root() {
        return PYIApplication;
    }

    [x: string]: any;
    public controllers: PYIController[];
    public middlewares: PYIMiddleware[];
    public interceptors: PYIInterceptor[];
    public components: PYIComponent[];
    public config!: PYIAutoAppConfiguration;

    private _bootstrap!: () => any;

    public set asynctx({ Vo, body, execption }: PYIExecptionAsync) {
        if (Vo) {
            if (body.then) {
                body.then((resp: any) => {
                    console.log(3);
                    this.ctx = new (Vo as any)(resp);
                    return this.ctx;
                }).catch((err: Error) => {
                    console.log(4);
                    this.ctx = {
                        ...(new (Vo as any)()).throws(err),
                        ...execption
                    };
                    return this.ctx;
                });
            }
        } else {
            this.ctx = body;
        }
    }

    public get asynctx() {
        return this.ctx;
    }

    constructor() {
        super();
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
        this.components = [];
        this.run();
    }

    public async run() {
        const { onInit, didLoad, onInitComponent, didInitComponent, didMakeConfig } = this;
        await console.log(green(`start load project files ...`));
        // tslint:disable-next-line:no-unused-expression
        onInit && await onInit.apply(this);
        const chokidar: PYIChokidar = await PYIChokidar.runtime(this.mode).setup(this);
        await console.log(green(`load end project files success ...`));
        // tslint:disable-next-line:no-unused-expression
        didLoad && await didLoad.apply(this);
        const comps = await chokidar.comps;
        const config = await chokidar.appconfig;
        this.config = await config;
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
        this.config.defaultErrorHandler = false;

        /**
         * body formatter
         */
        await this.use(bodyParser());

        const app = await useKoaServer(this, {
            ...(this.config as any),
            defaultErrorHandler: false
        });
        // console.log(app === this);
        this._bootstrap();
        return app;
    }

    public bootstrap(bootstrap: () => any) {
        this._bootstrap = bootstrap;
    }

    public async starter() {
        this.listen(this.config.port, () => {
            // tslint:disable-next-line:no-unused-expression
            this.didRuntime && this.didRuntime.apply(this);
            console.log(green(
                `PYI Server runtime listen: http://${this.config.host || 'localhost'}:${this.config.port}`
            ));
        });
    }
}

export function PYIBootstrap(target: any, key?: string) {
    let mode: string = 'development';
    if (process.env.NODE_ENV) { mode = process.env.NODE_ENV; }
    target.prototype.mode = mode;
}
