import { AppConfigOption, Configuration, autowired, PYIAutoAppConfiguration } from 'pyi';
import { Development } from './development';
import { Production } from './production';
import { join } from 'path';

/**
 * 这里可以通过注解注入
 * 也可以直接赋值
 */
@Configuration
export class AppConfiguration extends PYIAutoAppConfiguration<any> {
    /**
     * 注解注入
     */
    @autowired
    public development!: Development;
    @autowired
    public production!: Production;

    /**
     * 赋值注入
     */
    // public usemode: AppConfigOption;

    constructor(config: AppConfigOption, props: any) {
        super(config, props);

        this.development.output = join(config.entry, '../runtime');
        this.production.output = join(config.entry, '../runtime');

        /**
         * 赋值注入
         */
        // this.usemode = new AppConfigOption();
    }
}
