import {
    Controller, PYIController, RequestMapping,
    autoconnect, RequestMappingMethod,
    Body, PYIExecption, PYIThrows
} from '../../src';
import { TestService } from '../services/test.service';
import { LoginDao } from '../dao/test/login.dao';
import { ResponseDto } from '../dto/response.dto';

@Controller({ prefix: '/test1' })
export class Test1Controller extends PYIController {

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
        return PYIExecption(class extends PYIThrows<Test1Controller> {
            public async throws(this: Test1Controller) {
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
        return PYIExecption(class extends PYIThrows<Test1Controller> {
            public async throws(this: Test1Controller) {
                return 'test ...';
            }
        });
    }
}
