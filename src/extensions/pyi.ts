/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export interface PYICoreApp {
    _root(): typeof PYICoreApp;
    _base(): typeof PYICoreApp;
    _extends(): typeof PYICoreApp;
}

export abstract class PYICoreApp {
}

export class PYICore extends PYICoreApp implements PYICoreApp {
    public static __proto__: any;
    public static _path: string;

    public static _root(): typeof PYICore {
        return PYICore;
    }

    public static _base(): typeof PYICore {
        return PYICore;
    }

    public static _extends() {
        return this.__proto__;
    }

    public _root(): typeof PYICore {
        return PYICore;
    }

    public _base(): typeof PYICore {
        return PYICore;
    }

    public _extends(): any {
        const { __proto__ } = this.constructor as any;
        return __proto__;
    }
}

export type PYICoreClass<V> = (new (...args: any[]) => V & PYICore) & typeof PYICore;
