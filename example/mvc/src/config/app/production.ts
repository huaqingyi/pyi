import { AppConfigOption, Configuration } from '../../../../../src';

@Configuration
export class Production extends AppConfigOption {
    constructor() {
        super();
        this.server.port = 4005;
    }
}
