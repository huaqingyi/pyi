import { PYIPlugins, PYIPluginsInstall } from '../core/plugins';
import logger from 'koa-logger';

export class HttpLogger extends PYIPlugins implements PYIPluginsInstall {
    public async install(ctx, next) {
        return logger()(ctx, next);
    }
}
