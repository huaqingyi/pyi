import { Component, PYIComponent } from 'pyi';
import { scheduleJob } from 'node-schedule';
import { red } from 'colors';

@Component
export class Schedule extends PYIComponent<any> {
    public async test() {
        return await scheduleJob({ second: 1 }, async () => {
            return await console.log(red('The answer to life, the universe, and everything!'));
        });
    }
}
