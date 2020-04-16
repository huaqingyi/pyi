import { Configuration, PYIAppConfiguration } from '../../src';

@Configuration
export class AppConfiguration extends PYIAppConfiguration {
    public async development() {
        this.port = 4001;
        this.docs = {
            path: '/swagger.io',
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
        };
    }
    public async production() {
        this.port = 4002;
    }
}
