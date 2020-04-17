import { KoaMiddlewareInterface } from '../../extends';
import { PYICore, PYIApp, PYICoreClass } from '../../core';
import { PYIController } from '../../decorators';
export declare class PYIServlet extends PYICore {
    static _base(): PYIApp;
    use(action: Function, secretKey: string, context: any, next: (err?: any) => Promise<any>): any;
    notFound(secretKey: string, context: any, next: (err?: any) => Promise<any>): any;
    multiple(actions: Function[], secretKey: string, context: any, next: (err?: any) => Promise<any>): any;
}
export declare class JWTAuthServlet extends PYIServlet {
    use(this: PYIController, action: Function, secretKey: string, context: any, next: (err?: any) => Promise<any>): Promise<any>;
    notFound(secretKey: string, context: any, next: any): Promise<void>;
    multiple(actions: any, secretKey: string, context: any, next: any): Promise<void>;
}
export declare function UseServlet(servlet: KoaMiddlewareInterface): (target: PYICoreClass<PYIController<any>>, key: string) => PYICoreClass<PYIController<any>> | undefined;
