import { Application } from '../core';
export interface PYIApplicationImpl {
    [x: string]: any;
    onInit?: () => any;
    didLoad?: () => any;
    onInitComponent?: () => any;
    didInitComponent?: () => any;
    didMakeConfig?: () => any;
    didRuntime?: () => any;
}
export declare abstract class PYIApplication extends Application implements PYIApplicationImpl {
    static _pyi: () => any;
    static _root(): typeof PYIApplication;
    run(path: string | string[]): Promise<this>;
    [x: string]: any;
}
export declare function PYIBootstrap(target: any, key?: string): void;
