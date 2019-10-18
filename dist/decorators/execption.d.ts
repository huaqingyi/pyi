import { PYIDto } from './dto';
export declare function PYIExecption<UseParentClass = any, UsePYIDto = PYIDto>(this: any, execption: UseParentClass & any, Vo?: UsePYIDto & any): any;
export interface PYIThrows {
    errno?: number;
    errmsg?: string;
    throws: (...args: any) => Promise<any>;
}
export declare function throws(target: any, key: string): any;
