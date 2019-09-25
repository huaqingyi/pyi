import { PYIBase } from '../core';

export abstract class PYIVo extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIVo;
    }

    public err?: boolean;
    public errno?: number;
    public errmsg?: string;
    public data: any;

    constructor(data?: any) {
        super();
        this.err = false;
        this.data = data || {};
    }

    public async throws(err: Error, errno?: number, errmsg?: string) {
        this.err = true;
        this.errno = errno || 1003;
        if (errmsg) {
            this.errmsg = errmsg;
            console.error(err);
        } else {
            this.errmsg = `${err.name}${err.message}${err.stack ? `(${err.stack})` : ''}`;
        }
        this.data = {};
        return this;
    }
}

export function Vo<UsePYIVo = PYIVo>(target: UsePYIVo, key?: string) {
    // console.log('dto', target);
}

// tslint:disable-next-line:max-classes-per-file
export interface PYIExecption {
    errno?: number;
    errmsg?: string;
    throws: (...args: any) => Promise<any>;
}
