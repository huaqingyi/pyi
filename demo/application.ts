import { PYIBootstrap, PYIApplication, autowired, PYIApplicationHook, PYIBase } from '../src';
import { Schedule } from './src/components/schedule';
import Koa from 'koa';

@PYIBootstrap
export class Application extends PYIApplication implements PYIApplicationHook {

    public static main(args: string[]) {
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

    // public async addComponent(comp: PYIBase) {
    //     console.log('add', comp);
    //     return await comp;
    // }
    // public async didLoadAllComponent(comp: PYIBase) {
    //     console.log('loadAll', comp);
    //     return await comp;
    // }
    public async didInitApp(app: Koa) {
        console.log('init', app);
        return await app;
    }
    public async didRunApp(err?: any) {
        console.log('run', err);
    }
}
