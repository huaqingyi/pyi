import { PYIVo, Vo } from 'pyi';

@Vo
export class TestVo extends PYIVo {
    public err!: boolean;
    public data!: any;
}
