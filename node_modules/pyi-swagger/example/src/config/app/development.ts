import { AppConfigOption, Configuration } from 'pyi';

@Configuration
export class Development extends AppConfigOption {
    constructor() {
        super();
        this.server.port = 4004;
    }
}
