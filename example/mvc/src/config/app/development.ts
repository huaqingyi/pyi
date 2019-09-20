import { AppConfigOption, Configuration } from '../../../../../src';

@Configuration
export class Development extends AppConfigOption {
    constructor() {
        super();
        this.server.port = 4004;
    }
}
