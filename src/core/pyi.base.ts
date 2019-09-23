import { AppConfigOption } from './config';

export abstract class PYIBase {
    public static _pyi() {
        return {};
    }
    public static _baisc() {
        return PYIBase;
    }
}

export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
