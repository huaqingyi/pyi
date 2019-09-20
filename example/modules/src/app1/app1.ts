import { PYIBootstrap, PYIApplication } from '../../../../src';

@PYIBootstrap
export class APP1 extends PYIApplication {
    public static main(args: string[]) {
        /**
         * 指定项目路径
         */
        APP1.runtime(__dirname);
    }
}
