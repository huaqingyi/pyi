import { Dto, PYIDto } from '../../../src';

@Dto
export class TestDto extends PYIDto {
    public err!: boolean;
    public data!: any;
}
