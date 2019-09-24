import { Context } from 'koa';
import { PYIBase } from '../core';

export abstract class PYIDto extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIDto;
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

    public async throws(err: Error, errno?: number) {
        this.err = true;
        this.errno = errno || 1003;
        this.errmsg = `${err.name}${err.message}${err.stack ? `(${err.stack})` : ''}`;
        this.data = {};
    }
}

export function Dto<UsePYIDto = PYIDto>(target: UsePYIDto, key?: string) {
    console.log('dto', target);
}

export function Execption<ExecptionDto = PYIDto>(dto: ExecptionDto) {
    return (target: any, key: string, descriptor: any) => {
        console.log(dto);
    };
}
