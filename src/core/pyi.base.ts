import { AppConfigOption } from './config';

export abstract class PYIBase {
    public static _pyi() {
        return {};
    }
}

export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
