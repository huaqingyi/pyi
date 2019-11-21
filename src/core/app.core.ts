import Koa, { Context, Middleware, DefaultState, DefaultContext } from 'koa';
import { PYICoreApp } from './pyi.core';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIAutoAppConfiguration } from '../decorators';
import { green } from 'colors';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';

export class Application<StateT = Koa.DefaultState, CustomT = Koa.DefaultContext> extends Koa implements PYICoreApp {
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
    public ctx!: Context;

    protected app!: this;

    constructor() {
        super();
        this._setup = (new BehaviorSubject(null)).pipe(filter((v) => !!v)) as any;
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
        this.components = [];
        this.dto = false;
    }

    public use<NewStateT = any, NewCustomT = any>(
        middleware: Middleware<StateT & NewStateT, CustomT & NewCustomT>
    ): any & Koa<StateT & NewStateT, CustomT & NewCustomT> {
        return super.use(async (ctx, next) => {
            this.ctx = ctx as Context;
            return middleware.apply(this, [ctx as any, next]);
        }) as any;
    }

    public async addUse() {
        /**
         * body formatter
         */
        await this.use(bodyParser());

        /**
         * session
         */
        const sconfig = { ...this.config.session };
        if (!this.keys) { this.keys = sconfig.keys || ['pyi secret hurr']; }
        this.config.session.keys = this.keys;
        delete sconfig.keys;
        await this.use(session(this.config.session as any, this));

        return await this;
    }

    public async setup(app: Application, callback?: () => any) {
        this.config.globalDto.prototype.app = this;

        // this.use(this.logger);
        this.on('error', async (err: any, ctx: Context) => {
            if (this.dto === false && this.config.enableDto === true) {
                const Dto = this.config.globalDto;
                ctx.body = await (new Dto()).throws(err, ctx.errno || 500, ctx.errmsg);
            } else {
                ctx.body = err;
            }
            delete ctx.errno;
            delete ctx.errmsg;
        });
        this.use(async (ctx, next) => {
            const code = ctx.response.status;
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
                default: return await logger((str, args) => {
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
        return this;
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

    public bootstrap(callback?: () => any) {
        return this._setup.subscribe((app) => {
            this.setup(app, callback);
        });
    }
}
