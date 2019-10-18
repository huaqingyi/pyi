import { PYIApplication } from '../decorators';
export declare class Maker {
    static runtime(app: PYIApplication): Maker;
    private app;
    constructor(app: PYIApplication);
    setup(comps: any[]): PYIApplication;
    useLoagger(comp: any): void;
}
