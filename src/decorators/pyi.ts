import { PYIChokidar, PYIArgs } from '../lib';
import Application from 'koa';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
export abstract class PYIApplication extends Application {

    public static complete: Observable<any>;

    public static isApplication: boolean = true;

    public static _pyi() {
        return {};
    }

    public static _extends() {
        return PYIApplication;
    }

    public static main(args: string[]): any {
        return 0;
    }

    /**
     * runtime bootstrap
     * @param projectpath application path
     * @param args cmd args
     */
    public static runtime(projectpath: string) {
        PYIApplication.complete = (new BehaviorSubject(null)).pipe(filter((o) => o !== null));
        PYIChokidar.runtime(projectpath, this);
    }

    constructor() { super(); }

    public async runtime(callback: (props: { starter: Function, config: AppConfigOption, watcher: FSWatcher }) => any) {
        PYIApplication.complete.subscribe(callback);
    }
}

/**
 * application main class
 * @param target application bootstrap classes(启动类)
 * @param key off
 */
export function PYIBootstrap(target: any, key?: string) {
    PYIArgs.register();
    target.main(process.argv);
    target.runtime.bind(target);
}
