import { Dto, PYIDto } from '../../src';

@Dto
export class ResponseDto extends PYIDto {
    public data: any;
    public success: boolean;
    public errcode?: number;
    public errmsg?: string;

    constructor(data: any) {
        super();
        this.data = data;
        this.success = true;
    }

    public throws(errors: Error) {
        this.success = false;
        switch (errors.name) {
            default:
                this.errcode = 1010;
                this.errmsg = errors.message;
                return this;
        }
    }
}
