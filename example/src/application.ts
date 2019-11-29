import { PYIBootstrap, PYIApplication, PYIApplicationImpl, autowired } from '../../src';
import { join } from 'path';
import { ScheduleComponent } from './components/schedule.component';
import { SwaggerInjectService, Swagger } from 'pyi-swagger';

@PYIBootstrap
export class Application extends PYIApplication implements PYIApplicationImpl {

    @autowired
    public schedule!: ScheduleComponent;

    public async onInit() {
        SwaggerInjectService.register();
        console.log('onInit ...');
    }

    public async didLoad() {
        console.log('didLoad ...');
    }

    public async onInitComponent() {
        console.log('onInitComponent ...');
    }

    public async didInitComponent() {
        console.log('didInitComponent ...');
    }

    public async didMakeConfig() {
        console.log('didMakeConfig ...');
        Swagger.build('/swagger.io', this, {
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

    public async didRuntime() {
        console.log('didRuntime ...');
        await this.schedule.test();
    }
}
