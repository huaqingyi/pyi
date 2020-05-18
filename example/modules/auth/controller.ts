import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption, PYIThrows
} from '../../../src';
import { TestService } from './service';
import { ResponseDto } from '../common/dto/response.dto';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET]
    })
    public test(): ResponseDto {
        return PYIExecption(class implements PYIThrows<this> {
            public async throws(this: TestController) {
                console.log(this.service);
                return await 'Hello World ...';
            }
        });
    }
}
