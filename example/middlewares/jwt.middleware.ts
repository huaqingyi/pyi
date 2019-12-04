import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from '../../src';
import { TestMiddleware } from './test.middleware';

@Middleware({
    type: 'before',
    before: TestMiddleware
})
export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(ctx, next) {
        await next();
        await console.log(2);
    }
}
