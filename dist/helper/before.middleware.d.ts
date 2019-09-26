import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Context } from 'koa';
import { PYIChokidar } from '../lib';
export declare class BeforeMiddleware implements ExpressMiddlewareInterface {
    comps: any;
    error?: {
        use?: Error;
        detail: Error;
    };
    chokider: PYIChokidar;
    use(ctx: Context, next: (ctx: Context) => any): Promise<any>;
}
