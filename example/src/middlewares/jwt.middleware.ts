import { TestDto } from './../dto/test.dto';
import { Context } from 'koa';
import { PYIMiddleware, Middleware, KoaMiddlewareInterface, throws, PYIExecption, PYIThrows } from '../../../src';
import jwt from 'jsonwebtoken';

@Middleware({ type: 'before' })
export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public excloude: string[];
    constructor() {
        super();
        this.excloude = [
            '/favicon.ico',
            '/login'
        ];
    }

    public async use(ctx: Context, next: (err?: any) => Promise<any>) {
        // ctx.body = await this.verify(ctx);
        next(ctx);
    }

    @throws
    public verify(ctx: Context): TestDto {
        return PYIExecption<JWTMiddleware>({
            async throws() {
                return new Promise((r, j) => {
                    if (this.excloude.indexOf(ctx.url) === -1) {
                        jwt.verify(ctx.header.authorization, 'pyi', async (err: any) => {
                            if (err) {
                                j(err);
                            } else { r(); }
                        });
                    } else { r(); }
                });
            }
        });
    }
}
