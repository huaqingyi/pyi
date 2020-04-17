import { KoaMiddlewareInterface, UseBefore } from '../../extends';
import { PYICore, PYIApp, PYICoreClass } from '../../core';
import { PYIController } from '../../decorators';
import { ResponseDto } from '../../decorators/dto';

export class PYIServlet extends PYICore {
    public static _base(): PYIApp {
        return PYIServlet;
    }

    // tslint:disable-next-line:no-empty
    public use(action: Function, secretKey: string, context: any, next: (err?: any) => Promise<any>): any { }
    // tslint:disable-next-line:no-empty
    public notFound(secretKey: string, context: any, next: (err?: any) => Promise<any>): any { }
    // tslint:disable-next-line:no-empty
    public multiple(actions: Function[], secretKey: string, context: any, next: (err?: any) => Promise<any>): any { }
}

export class JWTAuthServlet extends PYIServlet {
    public async use(
        this: PYIController,
        action: Function,
        secretKey: string,
        context: any,
        next: (err?: any) => Promise<any>
    ) {
        const whites: Function[] = (this.excludeJWT && await this.excludeJWT()) || [];
        if (whites.indexOf(action) !== -1) {
            return await next();
        } else {
            this.servlet(action, secretKey, context, next);
        }
    }

    public async notFound(secretKey: string, context, next) {
        const dto = new ResponseDto({});
        dto.errcode = 1404;
        const err = new Error('Not Found ...');
        context.body = await dto.throws(err);
        await next(context);
    }

    public async multiple(actions, secretKey: string, context, next) {
        const dto = new ResponseDto({});
        dto.errcode = 1404;
        const err = new Error('Multiple identical routers ...');
        context.body = await dto.throws(err);
        await next(context);
    }
}

export function UseServlet(servlet: KoaMiddlewareInterface) {
    return (target: PYICoreClass<PYIController>, key: string) => {
        if (target && target._base && target._base() === PYIController) {
            UseBefore(servlet as any)(target, key);
        } else {
            console.error('Servlet is Controller actions decorators ...');
            return target;
        }
    };
}
