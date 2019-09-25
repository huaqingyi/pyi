import { PYIVo, Vo } from '../../../src';

@Vo
export class TestVo extends PYIVo {
    public err!: boolean;
    public data!: any;
}
