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
    constructor(dirname: string | string[], mode: string);
    addFile(path: string): Promise<false | undefined>;
    setup(): Promise<PYIChokidar>;
}
