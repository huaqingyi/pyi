import { AppConfigOption } from './config';
export declare abstract class PYIBase {
    static _pyi(): {};
}
export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
