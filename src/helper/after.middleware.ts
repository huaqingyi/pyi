import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
import { PYIChokidar } from '../lib';

@Middleware({ type: 'after' })
export class AfterMiddleware implements ExpressMiddlewareInterface {
    public chokider!: PYIChokidar;
    public async use(ctx: Context, next: (ctx: Context) => any) {
        if (ctx.body && this.chokider.isViewObject === false) {
            if (this.chokider.config.pyi.defaultVo) {
                ctx.body = await this.chokider.config.pyi.defaultVo(ctx.body);
            }
        }
        // console.log('after', ctx.body);
        return await next(ctx);
    }
}
