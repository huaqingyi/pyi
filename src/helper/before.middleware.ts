import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
import { map } from 'lodash';

@Middleware({ type: 'before' })
export class BeforeMiddleware implements ExpressMiddlewareInterface {

    public comps!: any;

    public async use(ctx: Context, next: (ctx: Context) => any) {
        map(this.comps, (comp) => {
            if (comp.prototype) {
                comp.prototype.ctx = ctx;
            }
        });
        return await next(ctx);
    }
}
