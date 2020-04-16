import { 
    Controller, PYIController, RequestMapping, 
    autowired, autoconnect, RequestMappingMethod, 
    Body, PYIExecption, PYIThrows 
} from '../../src';
import { TestService } from '../services/test.service';
import { LoginDao } from '../dao/test/login.dao';
import { ResponseDto } from '../dto/response.dto';
import { summary } from '../../src/libs/swagger';

@Controller
export class TestController extends PYIController {

    @autoconnect
    public service!: TestService;

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET]
    })
    public async test() {
        this.logger.error(1111);
        console.log(111);
        console.log(await this.service.findAll());
        throw new Error('测试');
        return 111;
    }

    @RequestMapping({
        prefix: '/error'
    })
    public error(): ResponseDto {
        return PYIExecption(class extends PYIThrows<TestController> {
            public async throws(this: TestController) {
                console.log(await this.service.test());
                return 'test ...';
            }
        });
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
                return 'test ...';
            }
        });
    }
}
