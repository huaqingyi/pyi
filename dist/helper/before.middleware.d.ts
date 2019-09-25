import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
export declare class BeforeMiddleware implements ExpressMiddlewareInterface {
    comps: any;
    use(ctx: Context, next: (ctx: Context) => any): Promise<any>;
}
