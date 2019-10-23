import { Configuration, PYIAutoAppConfiguration } from '../../../src';
import { Context } from 'koa';
import { Options } from 'koa-jwt';

@Configuration
export class AppConfiguration extends PYIAutoAppConfiguration<any> {
    public port: number;
    constructor(props: any) {
        super();
        this.port = 4000;
        this.jwt = {
            secret: 'pyi test',
            path: [
                /^\/login/
            ],
            tokenKey: 'authorization'
        };
    }

    public async development() {
        this.port = 4001;
    }

    public async production() {
        this.port = 4002;
    }
}
