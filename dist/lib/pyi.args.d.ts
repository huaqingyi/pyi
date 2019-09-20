import { AppConfigOption } from '../core';
export declare abstract class PYIArgsOption {
    mode: string;
    watch: boolean;
    runtime: boolean;
    port: number;
    config: AppConfigOption;
    constructor();
}
export declare class PYIArgs extends PYIArgsOption {
    static _this: PYIArgs;
    static register(): PYIArgs;
    static reflact(): PYIArgs;
    static reset(config: AppConfigOption): AppConfigOption;
    constructor();
}
