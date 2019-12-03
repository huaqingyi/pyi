import { Controller, PYIController, RequestMapping } from '../../src';

@Controller
export class TestController extends PYIController {

    @RequestMapping({
        prefix: '/test'
    })
    public async test() {
        return 111;
    }
}
