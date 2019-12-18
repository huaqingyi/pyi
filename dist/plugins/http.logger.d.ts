import { PYIPlugins, PYIPluginsInstall } from '../core/plugins';
export declare class HttpLogger extends PYIPlugins implements PYIPluginsInstall {
    install(ctx: any, next: any): Promise<any>;
}
