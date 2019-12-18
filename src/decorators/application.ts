import { PYIAppConfiguration } from './configuration';
import { PYICore, PYIApp, PYICoreClass, PYIPlugins } from '../core';
import Koa, { DefaultState, DefaultContext } from 'koa';
import { createExecutor, KoaDriver } from '../extends';
import { Compile } from '../core/compile';
import { blue, green } from 'colors';
import { get } from 'node-emoji';
import { HttpLogger } from '../plugins/http.logger';
import { Signale } from 'signale';

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

// tslint:disable-next-line:no-empty-interface
export interface PYIOnPluginApplication {
    onPluginApplication: (plugins: PYICoreClass<PYIPlugins>) => any;
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
    public logger: Signale;
    private _bootstrap: () => any;
    private ready?: (value?: any | PromiseLike<any>) => void;

    constructor() {
        super();
        this.logger = new Signale();
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
        this.logger = new Signale(this.config.debugOptions || {});
        console.log(`${get('rocket')}  ${green(`application scan project config success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onConfigurationAfter && await this.onConfigurationAfter();
        const driver = new KoaDriver(this);
        await createExecutor(driver, {
            ...this.config as any, development: this.mode === 'development'
        });
        console.log(`${get('rocket')}  ${green(`application scan project init success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onInitApplication && await this.onInitApplication();

        // tslint:disable-next-line:no-empty
        const isPlugins: (plugins: PYICoreClass<PYIPlugins>) => any = this.onPluginApplication || (() => { });

        // // tslint:disable-next-line:no-unused-expression
        // this.onPluginApplication && await this.onPluginApplication(HttpLogger);
        if (await isPlugins(HttpLogger) !== false) {
            const logger = new HttpLogger(this);
            await logger.init();
        }
        // tslint:disable-next-line:no-unused-expression
        this.ready && await this.ready(this);
        await this._bootstrap();
    }
}
