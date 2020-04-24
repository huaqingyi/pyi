import { PYIAppConfiguration, Configuration } from '/Users/yihuaqing/Desktop/yihq/pyi/src';

@Configuration
export class AppConfig extends PYIAppConfiguration {
    constructor() {
        super();
    }

    public async development() {
        this.jwt = false;
    }

    public async production() {
        this.jwt = false;
    }
}
