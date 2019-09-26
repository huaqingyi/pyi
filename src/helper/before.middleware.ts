import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
import { map } from 'lodash';
import { PYIChokidar } from '../lib';

@Middleware({ type: 'before' })
export class BeforeMiddleware implements ExpressMiddlewareInterface {

    public comps!: any;
    public error?: { use?: Error, detail: Error };
    public chokider!: PYIChokidar;

    public async use(ctx: Context, next: (ctx: Context) => any) {
        this.chokider.isViewObject = false;
        if (this.error) {
            ctx.app.emit('error', this.error.use || this.error.detail, ctx);
        } else {
            map(this.comps, (comp) => {
                if (comp.prototype) {
                    comp.prototype.ctx = ctx;
                }
            });
        }
        return await next(ctx);
    }
}
