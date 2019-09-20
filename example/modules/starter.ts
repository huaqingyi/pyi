import { isMaster, fork } from 'cluster';
import { APP1 } from './src/app1/app1';
import { APP2 } from './src/app2/app2';

if (isMaster) {
    const app1 = fork().send(1);
    const app2 = fork().send(2);
} else {
    process.on('message', (code) => {
        if (code === 1) {
            const app1 = new APP1();
            app1.runtime(({ starter }) => {
                starter();
            });
        } else {
            const app2 = new APP2();
            app2.runtime(({ starter }) => {
                starter();
            });
        }
    });
}
