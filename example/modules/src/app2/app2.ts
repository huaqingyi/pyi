import { PYIBootstrap, PYIApplication } from '../../../../src';

@PYIBootstrap
export class APP2 extends PYIApplication {
    public static main(args: string[]) {
        /**
         * 指定项目路径
         */
        APP2.runtime(__dirname);
    }
}
