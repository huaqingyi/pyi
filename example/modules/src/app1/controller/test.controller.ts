import { Controller, RequestMapping, PYIController } from '../../../../../src';

@Controller
export class TestController extends PYIController {

    @RequestMapping({
        prefix: '/'
    })
    public async index() {
        return await 'Hello World App1 ...';
    }
}
