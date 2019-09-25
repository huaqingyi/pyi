import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';

@Middleware({ type: 'after' })
export class AfterMiddleware implements ExpressMiddlewareInterface {
    public async use(ctx: Context, next: (ctx: Context) => any) {
        // console.log('after');
        return await next(ctx);
    }
}
