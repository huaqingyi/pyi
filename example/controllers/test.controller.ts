import { 
    Controller, PYIController, RequestMapping, 
    autowired, autoconnect, RequestMappingMethod, 
    Body, PYIExecption, PYIThrows 
} from '../../src';
import { TestService } from '../services/test.service';
import { LoginDao } from '../dao/test/login.dao';
import { ResponseDto } from '../dto/response.dto';

@Controller
export class TestController extends PYIController {

    @autoconnect
    public service!: TestService;

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET]
    })
    public async test() {
        console.log(await this.service.findAll());
        throw new Error('测试');
        return 111;
    }

    @RequestMapping({
        prefix: '/valid',
        methods: [RequestMappingMethod.POST]
    })
    public valid(
        @Body({ validate: true }) login: LoginDao
    ): ResponseDto {
        return PYIExecption(class extends PYIThrows<TestController> {
            public async throws(this: TestController) {
                console.log(this.service);
                return 'test ...';
            }
        });
    }
}
