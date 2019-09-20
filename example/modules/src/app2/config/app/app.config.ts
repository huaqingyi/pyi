import { AppConfigOption, Configuration, autowired, PYIAutoAppConfiguration } from '../../../../../../src';
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

        this.development.output = join(config.entry, '../../runtime/app2');
        this.production.output = join(config.entry, '../../runtime/app2');

        this.development.pyi = this.production.pyi = this.default.pyi = {
            routePrefix: '/app2'
        };

        this.development.server.port = this.development.server.port = this.development.server.port = 4005;

        /**
         * 赋值注入
         */
        // this.usemode = new AppConfigOption();
    }
}
