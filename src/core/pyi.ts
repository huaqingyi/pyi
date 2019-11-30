// tslint:disable-next-line:no-empty-interface
export interface PYIApp extends Function {
    [x: string]: any;
}

export class PYICore extends Function implements PYIApp {
    [x: string]: any;
    public static __proto__: any;

    public static _pyi() {
        return {};
    }

    public static _root(): PYIApp {
        return PYICore;
    }

    public static _base(): PYIApp {
        return PYICore;
    }

    public static _extends() {
        return this.__proto__;
    }

    public static _runtime() {
        return this;
    }

    public static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }

    protected static _this: PYIApp;
}
