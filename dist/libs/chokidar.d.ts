import { Application } from '../core';
export declare class PYIChokidar {
    static runtime(dirname: string | string[], mode: string): PYIChokidar;
    files: {
        [x: string]: any;
    };
    comps: any[];
    appconfig: any;
    mode: string;
    private dirname;
    private watcher;
    private app;
    constructor(dirname: string | string[], mode: string);
    addFile(path: string): Promise<string | false | undefined>;
    setup(app: Application): Promise<PYIChokidar>;
}
