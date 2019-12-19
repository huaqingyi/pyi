import { PYIPlugin, AutoPlugin, PYIPluginsAppInstall } from '../../src';
import { SwaggerInjectService, Swagger } from 'pyi-swagger';

@AutoPlugin
export class SwaggerPlugins extends PYIPlugin implements PYIPluginsAppInstall {
    public async init() {
        console.log('plugins swagger ...');
        SwaggerInjectService.register();
        return await Swagger.build('/swagger.io', this.app, {
            info: {
                description: 'PYI Swagger 测试用例',
                title: 'PYI Swagger 测试用例'
            },
            securityDefinitions: {
                api_key: {
                    type: 'apiKey',
                    name: 'authorization',
                    in: 'header'
                }
            }
        });
    }
}
