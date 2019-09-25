import { PYIBase } from '../core';
export declare abstract class PYIVo extends PYIBase {
    static _pyi: () => any;
    static _extends(): typeof PYIVo;
    err?: boolean;
    errno?: number;
    errmsg?: string;
    data: any;
    constructor(data?: any);
    throws(err: Error, errno?: number, errmsg?: string): Promise<this>;
}
export declare function Vo<UsePYIVo = PYIVo>(target: UsePYIVo, key?: string): void;
