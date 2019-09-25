import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
export declare class AfterMiddleware implements ExpressMiddlewareInterface {
    use(ctx: Context, next: (ctx: Context) => any): Promise<any>;
}
