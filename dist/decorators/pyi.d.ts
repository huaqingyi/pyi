/// <reference types="koa-bodyparser" />
/// <reference types="node" />
import Application from 'koa';
import { Observable } from 'rxjs';
import { AppConfigOption } from '../config';
import { FSWatcher } from 'chokidar';
import { Socket } from 'net';
export interface PYIApplicationHook {
    addComponent?: (comp: any) => Promise<any>;
    didLoadAllComponent?: (comp: any) => any;
    didLoadConfig?: (config: AppConfigOption) => AppConfigOption;
    willInitApp?: (app: Application) => any;
    didInitApp?: (app: Application) => any;
    didRunApp?: (err?: any) => any;
    connection?: (sock: Socket, app: any) => any;
}
/**
 * base mian
 */
export declare abstract class PYIApplication extends Application {
    static complete: Observable<any>;
    static isApplication: boolean;
    static _pyi(): {};
    static _extends(): typeof PYIApplication;
    static main(args: string[]): any;
    /**
     * runtime bootstrap
     * @param projectpath application path
     * @param args cmd args
     */
    static runtime(projectpath: string): void;
    constructor();
    runtime(callback: (props: {
        starter: Function;
        config: AppConfigOption;
        watcher: FSWatcher;
    }) => any): Promise<void>;
}
/**
 * application main class
 * @param target application bootstrap classes(启动类)
 * @param key off
 */
export declare function PYIBootstrap(target: any, key?: string): void;
