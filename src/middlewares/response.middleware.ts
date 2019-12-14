import { PYIMiddleware, Middleware, KoaMiddlewareInterface } from '../../src/decorators';

@Middleware({ type: 'after', priority: 0 })
export class Responseiddleware extends PYIMiddleware implements KoaMiddlewareInterface {
    public async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        console.log('do something before execution...');
        return next().then(() => {
            console.log('do something after execution');
        }).catch((error) => {
            console.log('error handling is also here');
        });
    }
}
