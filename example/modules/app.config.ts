import { Configuration, PYIAppConfiguration } from '../../src';

@Configuration
export class AppConfiguration extends PYIAppConfiguration {
    public port: number;

    constructor() {
        super();
        this.port = 4000;
    }

    public async development() {
        this.port = 4002;
    }

    public async production() {
        this.port = 4002;
    }
}
