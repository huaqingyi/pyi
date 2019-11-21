import { JWTMiddleware } from './../middlewares/jwt.middleware';
import { Configuration, PYIAutoAppConfiguration } from '../../../src';

@Configuration
export class AppConfiguration extends PYIAutoAppConfiguration<any> {
    public port: number;

    public middleware: Function[];

    constructor(props: any) {
        super();
        this.port = 4000;
        this.middleware = [JWTMiddleware];
    }

    public async development() {
        this.port = 4001;
    }

    public async production() {
        this.port = 4002;
    }
}
