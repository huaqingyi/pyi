import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
import { PYIChokidar } from '../lib';
export declare class AfterMiddleware implements ExpressMiddlewareInterface {
    chokider: PYIChokidar;
    use(ctx: Context, next: (ctx: Context) => any): Promise<any>;
}
