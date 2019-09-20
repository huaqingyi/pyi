/// <reference types="node" />
import { AppConfigOption } from '../core';
import { Server } from 'http';
export declare class PYIChokidar {
    static runtime(dirname: string, application: any): PYIChokidar;
    private dirname;
    private config;
    private watcher;
    private files;
    private app;
    private port;
    private application;
    constructor(dirname: string, application: any, config: AppConfigOption);
    authFileExt(path: string): Promise<boolean>;
    addFile(path: string): Promise<false | undefined>;
    loadApplication(): Promise<Server>;
    ready(): Promise<void>;
}
