import { PYIAppConfiguration } from '../decorators';
import { PYIApp } from '../core';
export declare class PYIChokidar {
    static runtime(mode: string, callback: (file: PYIApp | PYIApp[]) => any): Promise<PYIChokidar>;
    config: PYIAppConfiguration;
    comps: PYIApp[];
    private callback;
    private watcher;
    private appPath;
    private projectPath;
    private mode;
    private fileTrans;
    constructor(mode: string, callback: (file: PYIApp | PYIApp[]) => any);
    addFile(path: string): Promise<false | undefined>;
    runtime(): Promise<PYIChokidar>;
}
