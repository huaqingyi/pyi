import { PYIAppConfiguration } from './configuration';
import { PYICore, PYIApp } from '../core';
import Koa, { DefaultState, DefaultContext, Context } from 'koa';
import { useKoaServer } from 'routing-controllers';
import { Compile } from '../core/compile';
import { blue, green } from 'colors';
import { get } from 'node-emoji';
import { Responseiddleware } from '../middlewares/response.middleware';

// tslint:disable-next-line:no-empty-interface
export interface PYIOnInit {
    onInit: () => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnScanInit {
    onScanInit: () => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnScanChange {
    onScanChange: () => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnScanAfter {
    onScanAfter: () => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnConfigurationInit {
    onConfigurationInit: () => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnConfigurationAfter {
    onConfigurationAfter: (config: PYIAppConfiguration) => any;
}

// tslint:disable-next-line:no-empty-interface
export interface PYIOnInitApplication {
    onInitApplication: () => any;
}

export type PYIApplicationClass<V> = (new (...args: any[]) => V & PYIApplication) & typeof PYIApplication;

export function PYIBootstrap<VC extends PYIApplicationClass<PYIApplication>>(tprops: VC): VC;
export function PYIBootstrap<Props = any>(
    props: Props & any
): <VC extends PYIApplicationClass<PYIApplication>>(target: VC) => VC;
export function PYIBootstrap(props: any | PYIApp) {
    let mode: string = 'development';
    if (process.env.NODE_ENV) { mode = process.env.NODE_ENV; }
    if (props._base && props._base() === PYIApplication) {
        props.prototype.mode = mode;
        return props;
    }
    return (target: PYIApp) => {
        target.prototype.props = props;
        return target;
    };
}

export class PYIApplication<
    StateT = DefaultState,
    CustomT = DefaultContext
    > extends Koa<StateT, CustomT> {
    [x: string]: any;
    public static __proto__: any;

    public static _pyi() {
        return {};
    }

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base(): PYIApp {
        return PYIApplication;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _pyiruntime() {
        return this;
    }

    public static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }

    protected static _this: PYIApplication;
    public mode!: string;
    public props?: any;
    public config!: PYIAppConfiguration;
    public compile: Compile;
    private _bootstrap: () => any;
    private ready?: (value?: any | PromiseLike<any>) => void;

    constructor() {
        super();
        // tslint:disable-next-line:no-unused-expression
        this.compile = new Compile(this);
        this.run();
        // tslint:disable-next-line:no-empty
        this._bootstrap = () => { };
    }

    public async bootstrap(callback: () => any) {
        this._bootstrap = callback;
        return await new Promise((r) => {
            this.ready = r;
        });
    }

    public async starter() {
        this.listen(this.config.port, this.config.host, () => {
            console.log(`${get('kiss')}  ${blue(
                `application running for http://${this.config.host}:${this.config.port}`
            )}`);
        });
    }

    private async run() {
        console.log(`${get('rocket')}  ${green(`application onInit runtime ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onInit && await this.onInit();

        console.log(`${get('rocket')}  ${green(`application scan project ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onScanInit && await this.onScanInit();
        const { config } = await this.compile.scanProject(async (file) => {
            console.log(`${get('rainbow')}  ${green(`application scan change components ...`)}`);
            // tslint:disable-next-line:no-unused-expression
            this.onScanChange && await this.onScanChange(file);
        });

        console.log(`${get('rocket')}  ${green(`application scan project config ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onConfigurationInit && await this.onConfigurationInit();

        this.config = await this.compile.configrationInit(config);
        console.log(`${get('rocket')}  ${green(`application scan project config success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onConfigurationAfter && await this.onConfigurationAfter();
        this.config.middlewares.push(Responseiddleware);
        await useKoaServer(this, {
            ...this.config as any, development: this.mode === 'development', defaultErrorHandler: true
        });
        // this.use(async (ctx, next) => {
        //     try {
        //         await next();
        //     } catch (e) {
        //         ctx.status = 500;
        //     }
        //     if (Number(ctx.status) === 404) {
        //         ctx.status = 404;
        //     }
        // });
        // this.use(async (ctx, next) => {
        //     await next();
        //     console.log(ctx.status);
        //     if (Number(ctx.status) === 404) {
        //         ctx.body = '404';
        //     }
        // });
        // this.on('error', (err, ctx) => {
        //     console.log('error', err, ctx);
        // });
        // this.use(async (ctx: Context, next) => {
        //     try {
        //         ctx.error = (code, message) => {
        //             if (typeof code === 'string') {
        //                 message = code;
        //                 code = 500;
        //             }
        //             ctx.throw(code || 500, message || '服务器错误');
        //         };
        //         await next();
        //     } catch (e) {
        //         console.log('catch', e);
        //     }
        // });
        console.log(`${get('rocket')}  ${green(`application scan project init success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onInitApplication && await this.onInitApplication();
        // tslint:disable-next-line:no-unused-expression
        this.ready && await this.ready(this);
        await this._bootstrap();
    }
}
