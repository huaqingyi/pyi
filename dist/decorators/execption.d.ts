import { PYIVo } from './impl';
export declare function PYIExecption<UseParentClass = any, UsePYIVo = PYIVo>(this: any, execption: UseParentClass & any, Vo?: UsePYIVo & any): any;
export interface PYIThrows {
    errno?: number;
    errmsg?: string;
    throws: (...args: any) => Promise<any>;
}
export declare function throws(target: any, key: string): any;
