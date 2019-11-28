import { TestDto } from './../dto/test.dto';
import { Context } from 'koa';
import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from '../../../src';
import jwt from 'jsonwebtoken';

// @Middleware({ type: 'before' })
// export class JWTMiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
//     public excloude: string[];
//     constructor() {
//         super();
//         this.excloude = [
//             '/favicon.ico',
//             '/login'
//         ];
//     }
//     public async use(ctx: Context, next: (err?: any) => Promise<any>) {
//         console.log(1);
//         // if (this.excloude.indexOf(ctx.url) === -1) {
//         //     jwt.verify(ctx.header.authorization, 'pyi', async (err: any) => {
//         //         if (err) {
//         //             const dto = new TestDto();
//         //             ctx.body = await dto.throws(new Error(err), 10014, err.message);
//         //             next();
//         //         } else {
//                     next();
//         //         }
//         //     });
//         // }
//     }
// }
