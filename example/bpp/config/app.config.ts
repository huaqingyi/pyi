import { PYIAppConfiguration, Configuration, JWTAuthServlet } from '/Users/yihuaqing/Desktop/yihq/pyi/src';

@Configuration
export class AppConfig extends PYIAppConfiguration {
    constructor() {
        super();
    }

    public async development() {
        this.jwt = JWTAuthServlet;
    }

    public async production() {
        this.jwt = false;
    }
}
