import { Controller, PYIController, RequestMapping, autowired } from '../../src';
import { TestService } from '../services/test.service';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @RequestMapping({ prefix: '/test' })
    public async test() {
        console.log(this.service);
        return 111;
    }
}
