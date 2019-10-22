import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption,
    PYIThrows, Header,
    Res, QueryParams, Body, Ctx
} from '../../../src';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test.dto';
import { Response, Context } from 'koa';
import { tags, request, summary, body } from 'pyi-swagger';
import send from 'koa-send';
import { join } from 'path';
import { LoginValidation } from '../validation/login.validation';
import jwt from 'jsonwebtoken';

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
        prefix: '/resource/*'
    })
    public async resource(@Ctx() ctx: Context) {
        this.dto = true;
        return await send(ctx, ctx.path, { root: join(__dirname, '../') });
    }

    @RequestMapping({
        prefix: '/favicon.ico'
    })
    public async favicon(@Ctx() ctx: Context) {
        this.dto = true;
        return await send(ctx, ctx.path, { root: join(__dirname, '../resource/static') });
    }

    @RequestMapping({
        prefix: '/login',
        methods: [RequestMappingMethod.POST]
    })
    @request(RequestMappingMethod.POST, '/login')
    @summary('login user auth jwt .')
    @body(LoginValidation)
    @tag
    public login(
        @Body({ validate: true }) loginForm: LoginValidation
    ): TestDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                // this.append('test', '111');
                return await { userid: 1 };
            }
        });
    }

    @RequestMapping({
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
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
    public err(): TestDto {
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
        @QueryParams() gets: any
    ) {
        // console.log(await this.service.findAllUsers());
        return await 'Hello World ...';
    }
}
