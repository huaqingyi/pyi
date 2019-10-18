import { Data } from 'koa-swagger-decorator/dist/types';
export declare class SwaggerInjectService {
    private static _this;
    static register(): SwaggerInjectService;
    static runtime(): SwaggerInjectService;
    data: Data;
    constructor();
    add(target: any, name: string, content: any): void;
    addMulti(target: any, content: any, filters?: string[]): void;
    toJSON(options?: {
        title?: string;
        description?: string;
        version?: string;
        swaggerOptions?: object;
    }): any;
}
