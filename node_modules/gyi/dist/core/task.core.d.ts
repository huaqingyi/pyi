import { GYI } from "./gyi";
import Undertaker from 'undertaker';
import { LibsBase } from "../libs";
export interface TaskOption {
    src?: string;
    dest?: string;
    series?: Undertaker.Task[];
    parallel?: Undertaker.Task[];
    injectable?: {
        [x: string]: any;
    };
}
export interface TaskConfig {
    option?: TaskOption;
    inject?: string[];
}
export declare class TaskCore extends GYI {
    protected libs: LibsBase[];
    constructor();
    injectTask(name: string, key: string, option: TaskConfig): Promise<void>;
    makeTask(mode: Function): Promise<void>;
}
