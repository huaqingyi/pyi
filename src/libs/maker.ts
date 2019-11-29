import { map } from 'lodash';
import { PYIController, PYIMiddleware, PYIInterceptor, PYIComponent, PYIApplication, PYIAutoMiddleware } from '../decorators';
import signale from 'signale';

export class Maker {

    public static runtime(app: PYIApplication) {
        return new this(app);
    }

    private app: PYIApplication;

    constructor(app: PYIApplication) {
        this.app = app;
        this.app.success = signale.success;
        this.app.debug = signale.debug;
        this.app.pending = signale.pending;
        this.app.fatal = signale.fatal;
        this.app.watch = signale.watch;
        this.app.complete = signale.complete;
        this.app.error = signale.error;
    }

    public setup(comps: any[]) {
        const controllers: PYIController[] = [];
        const middlewares: PYIMiddleware[] = [];
        const umiddlewares: PYIMiddleware[] = [];
        const interceptors: PYIInterceptor[] = [];
        const components: PYIComponent[] = [];
        map(comps, (comp) => {
            const { _root } = comp;

            this.useLoagger(comp);

            comp.prototype.app = this.app;

            if (_root && _root() === PYIController) { controllers.push(comp); }
            if (_root && _root() === PYIAutoMiddleware) { middlewares.push(comp); }
            if (_root && _root() === PYIMiddleware) { umiddlewares.push(comp); }
            if (_root && _root() === PYIInterceptor) { interceptors.push(comp); }
            if (_root && _root() === PYIComponent) { components.push(comp); }
        });
        this.app.controllers = this.app.controllers.concat(controllers);
        this.app.middlewares = this.app.middlewares.concat(middlewares);
        this.app.interceptors = this.app.interceptors.concat(interceptors);
        this.app.components = this.app.components.concat(components);
        return this.app;
    }

    public useLoagger(comp: any) {
        if (comp.prototype) {
            comp.prototype.success = this.app.success;
            comp.prototype.debug = this.app.debug;
            comp.prototype.pending = this.app.pending;
            comp.prototype.fatal = this.app.fatal;
            comp.prototype.watch = this.app.watch;
            comp.prototype.complete = this.app.complete;
            comp.prototype.error = this.app.error;
        }
    }
}
