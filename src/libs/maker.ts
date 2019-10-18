import Koa from 'koa';
import { map } from 'lodash';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIApplication } from '../decorators';

export class Maker {

    public static runtime(app: PYIApplication) {
        return new this(app);
    }

    private app: PYIApplication;

    constructor(app: PYIApplication) {
        this.app = app;
    }

    public setup(comps: any[]) {
        const controllers: PYIController[] = [];
        const middlewares: PYIMiddleware[] = [];
        const interceptors: PYIInterceptor[] = [];
        const components: PYIComponent[] = [];
        map(comps, (comp) => {
            const { _root } = comp;
            if (_root && _root() === PYIController) { controllers.push(comp); }
            if (_root && _root() === PYIMiddleware) { middlewares.push(comp); }
            if (_root && _root() === PYIInterceptor) { interceptors.push(comp); }
            if (_root && _root() === PYIComponent) { components.push(comp); }
        });
        this.app.controllers = this.app.controllers.concat(controllers);
        this.app.middlewares = this.app.middlewares.concat(middlewares);
        this.app.interceptors = this.app.interceptors.concat(interceptors);
        this.app.components = this.app.components.concat(components);
        return this.app;
    }
}
