import { PYIBootstrap, PYIApplication, autowired, PYIApplicationHook } from 'pyi';
import Koa from 'koa';
import { Schedule } from './components/schedule';
import { SwaggerInjectService, Swagger } from '../../src';

@PYIBootstrap
export class Application extends PYIApplication implements PYIApplicationHook {

    public static main(args: string[]) {
        SwaggerInjectService.register();
        /**
         * 指定项目路径
         */
        Application.runtime(__dirname);
    }

    @autowired
    public schedule!: Schedule;

    constructor() {
        super();
        this.scheduleWork();
    }

    public async scheduleWork() {
        await this.schedule.test();
    }

    public async willInitApp(app: Koa) {
        await Swagger.build('/swagger', app);
    }
}
