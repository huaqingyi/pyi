import { PYIBootstrap, PYIApplication } from '../../src';

@PYIBootstrap
export class Application extends PYIApplication {
    public static main(args: string[]) {
        /**
         * 指定项目路径
         */
        Application.runtime(__dirname);
    }
}
