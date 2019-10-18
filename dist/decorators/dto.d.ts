import { PYICore } from '../core';
export declare abstract class PYIDto extends PYICore {
    static _pyi: () => any;
    static _root(): typeof PYIDto;
    err?: boolean;
    errno?: number;
    errmsg?: string;
    data: any;
    constructor(data?: any);
    throws(err: Error, errno?: number, errmsg?: string): Promise<this>;
}
export declare class PYIGDto extends PYIDto {
    err: boolean;
    data: any;
}
export declare function Dto<UsePYIDto = PYIDto>(target: UsePYIDto, key?: string): void;
