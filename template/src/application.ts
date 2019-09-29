import { PYIBootstrap, PYIApplication, autowired } from 'pyi';
import { Schedule } from './components/schedule';

@PYIBootstrap
export class Application extends PYIApplication {

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
}
