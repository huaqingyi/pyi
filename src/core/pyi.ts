// tslint:disable-next-line:no-empty-interface
export interface PYIApp extends Function {
    [x: string]: any;
}

export type PYICoreClass<V> = (new (...args: any[]) => V & PYICore) & typeof PYICore;

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

    public static _runtime(...props: any) {
        // console.log(this);
        // if (!this._this) {
        //     this._this = new this(...props);
        //     return this._this;
        // } else { return new this(...props); }
        return new this();
    }

    public static _connect(...props: any) {
        if (!this._this) {
            this._this = new this(...props);
        }
        return this._this;
    }

    protected static _this: PYIApp;

    public mode!: string;
}
