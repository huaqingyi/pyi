import { AppConfigOption, Configuration } from '../../../../src';

@Configuration
export class Production extends AppConfigOption {
    constructor() {
        super();
        this.compilerOptions.declaration = true;
        this.server.port = 4005;
    }
}
