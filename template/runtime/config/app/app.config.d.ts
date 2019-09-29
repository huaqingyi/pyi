import { AppConfigOption, PYIAutoAppConfiguration } from 'pyi';
import { Development } from './development';
import { Production } from './production';
/**
 * 这里可以通过注解注入
 * 也可以直接赋值
 */
export declare class AppConfiguration extends PYIAutoAppConfiguration<any> {
    /**
     * 注解注入
     */
    development: Development;
    production: Production;
    /**
     * 赋值注入
     */
    constructor(config: AppConfigOption, props: any);
}
