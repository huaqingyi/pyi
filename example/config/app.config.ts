import { PYIAppConfiguration, Configuration } from '/Users/yihuaqing/Desktop/yihq/pyi/src';

@Configuration
export class AppConfig extends PYIAppConfiguration {
    constructor() {
        super();
    }

    public async development() {
        this.port = 4001;
        this.watch = true;
    }

    public async production() {
        this.port = 4002;
    }
}
