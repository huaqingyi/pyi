import 'ts-node/register';
import { filter } from 'lodash';
import { PYIApplication } from '../decorators';

(async () => {
    console.log(process.argv);
    const jspacks = await import(process.argv[2]);
    const [JSApplication] = filter(jspacks, (comp) => comp.isApplication || false);
    const jsapp: PYIApplication = new JSApplication();
    jsapp.runtime(({ starter }) => {
        starter();
    });
})();
