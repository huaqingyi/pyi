import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption,
    PYIThrows
} from '../../../src';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test.dto';
import { Req, Res, QueryParams, Body } from 'routing-controllers';
import { Request, Response } from 'koa';
import { tags, request, summary } from 'pyi-swagger';

const tag = tags(['TestController']);
const userSchema = {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @RequestMapping({
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                return await 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/error'
    })
    public error(): TestDto {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1000;
                this.errmsg = 'test error ...';
                throw new Error('test error');
                return await 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/test',
        // methods: [RequestMappingMethod.GET]
    })
    public async test(
        @Res() response: Response,
        @QueryParams() gets: any,
        @Body() body: any
    ) {
        // console.log(await this.service.findAllUsers());
        return await 'Hello World ...';
    }
}
