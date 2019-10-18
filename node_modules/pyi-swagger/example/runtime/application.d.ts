import { PYIApplication } from 'pyi';
import { Schedule } from './components/schedule';
export declare class Application extends PYIApplication {
    static main(args: string[]): void;
    schedule: Schedule;
    constructor();
    scheduleWork(): Promise<void>;
}
