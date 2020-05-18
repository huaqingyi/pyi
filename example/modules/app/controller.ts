import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired,
} from '../../../src';
import { TestService } from './service';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET]
    })
    public test() {
        return 'Hello World ...';
    }
}
