import Koa, { Context } from 'koa';
import { PYICoreApp } from './pyi.core';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIAutoAppConfiguration } from '../decorators';
import { green } from 'colors';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

export class Application extends Koa implements PYICoreApp {
    public static __proto__: any;

    public static _pyi() {
        return {};
    }

    public static _root(): PYICoreApp {
        return Application;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _runtime() {
        return this;
    }

    public static bootstrap(): Application {
        if (!this._this) { this._this = new this(); }
        return this._this;
    }

    protected static _this: Application;
    [x: string]: any;
    public controllers: PYIController[];
    public middlewares: PYIMiddleware[];
    public interceptors: PYIInterceptor[];
    public components: PYIComponent[];
    public config!: PYIAutoAppConfiguration;
    public mode!: string;
    public dto: boolean;
    public _setup: BehaviorSubject<any>;
    public success!: (...args: any) => any;
    public debug!: (...args: any) => any;
    public pending!: (...args: any) => any;
    public fatal!: (...args: any) => any;
    public watch!: (...args: any) => any;
    public complete!: (...args: any) => any;
    public error!: (...args: any) => any;

    protected app!: this;

    constructor() {
        super();
        this._setup = (new BehaviorSubject(null)).pipe(filter((v) => !!v)) as any;
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
        this.components = [];
        this.dto = false;
        this.use(bodyParser());
    }

    public async setup(app: Application, callback?: () => any) {
        this.config.globalDto.prototype.app = this;
        // this.use(this.logger);
        this.on('error', async (err: any, ctx: Context) => {
            if (this.dto === false && this.config.enableDto === true) {
                const Dto = this.config.globalDto;
                ctx.body = await (new Dto()).throws(err, 500);
            } else {
                ctx.body = err;
            }
        });
        this.use(async (ctx, next) => {
            const code = ctx.response.status;
            console.log(code);
            switch (code) {
                case 500:
                case 404: return await logger((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.error(str);
                })(ctx, next);
                case 200: return await logger((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.success(str);
                })(ctx, next);
                default:  return await logger((str, args) => {
                    // redirect koa logger to other output pipe
                    // default is process.stdout(by console.log function)
                    this.pending(str);
                })(ctx, next);
            }
        });
        this.use(async (ctx, next) => {
            if (ctx.response.status !== 200) { return await next(); }
            if (this.dto === false && this.config.enableDto === true) {
                const Dto = this.config.globalDto;
                const trys = await new Dto(ctx.body);
                ctx.body = trys;
            }
            this.dto = false;
            return next();
        });

        // tslint:disable-next-line:no-unused-expression
        callback && callback.apply(this);

        this.listen(this.config.port, () => {
            // tslint:disable-next-line:no-unused-expression
            this.didRuntime && this.didRuntime.apply(this);
            console.log(green(
                `PYI Server runtime listen: http://${this.config.host || 'localhost'}:${this.config.port}`
            ));
        });
        return this;
    }

    public starter(callback?: () => any) {
        return this._setup.subscribe((app) => {
            this.setup(app, callback);
        });
    }
}
