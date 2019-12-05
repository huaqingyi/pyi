import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from '../../src';

@Middleware
export class TestMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(ctx, next) {
        await next();
        await console.log(1);
    }
}
