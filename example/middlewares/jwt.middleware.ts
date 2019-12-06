import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from '../../src';

@Middleware({ type: 'before', priority: 0 })
export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(ctx, next) {
        await next();
        await console.log(0);
    }
}
