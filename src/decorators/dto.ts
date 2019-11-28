import { PYICore } from '../core';
import { yellow } from 'colors';

export abstract class PYIDto extends PYICore {
    public static _pyi: () => any;
    public static _root() {
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

    public async throws(err: Error, errno?: number, errmsg?: string) {
        this.err = true;
        this.errno = errno || 1003;
        if (errmsg) {
            this.errmsg = errmsg;
            console.log(yellow(`${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`));
            // console.error(err);
        } else {
            this.errmsg = `${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`;
        }
        this.data = {};
        return this;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class PYIGDto extends PYIDto {
    public err!: boolean;
    public data!: any;
}

export function Dto<UsePYIDto = PYIDto>(target: UsePYIDto, key?: string) {
    // console.log('dto', target);
}
