import { AppConfigOption, Configuration, PYIAutoAppConfiguration } from '../../../../src';
import { join } from 'path';

@Configuration
export class AppConfiguration extends PYIAutoAppConfiguration<any> {

    constructor(config: AppConfigOption, props: any) {
        super(config, props);
        this.default.output = join(config.entry, '../runtime');
    }
}
