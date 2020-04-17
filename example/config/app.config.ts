import { Configuration, PYIAppConfiguration } from '../../src';
import { JWTAuthServlet } from '../../src/libs/jwt/jwt.auth.servlet';

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
        this.jwt = JWTAuthServlet;
    }
    public async production() {
        this.port = 4002;
        this.jwt = JWTAuthServlet;
    }
}
