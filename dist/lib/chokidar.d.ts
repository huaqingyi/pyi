/// <reference types="node" />
import { AppConfigOption } from '../config';
import { Server } from 'http';
export declare class PYIChokidar {
    static runtime(dirname: string, application: any): PYIChokidar;
    isViewObject: boolean;
    config: AppConfigOption;
    private dirname;
    private watcher;
    private files;
    private app;
    private application;
    private loadFileError?;
    constructor(dirname: string, application: any, config: AppConfigOption);
    authFileExt(path: string): Promise<boolean>;
    addFile(path: string): Promise<false | undefined>;
    loadApplication(controllers: any[], middlewares: any[], interceptors: any[], connections: any[], config?: AppConfigOption): Promise<Server>;
    ready(): Promise<void>;
}
