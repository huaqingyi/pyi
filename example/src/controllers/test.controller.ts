import {
    Controller, RequestMapping, RequestMappingMethod,
    PYIController, autowired, PYIExecption,
    PYIThrows,
    Res, QueryParams, Body, Ctx, Req
} from '../../../src';
import { TestService } from '../services/test.service';
import { TestDto } from '../dto/test.dto';
import { Response, Context } from 'koa';
import { tags, request, summary, body, security } from 'pyi-swagger';
import send from 'koa-send';
import { join } from 'path';
import { UserDto } from '../dto/user.info';
import jwt from 'jsonwebtoken';

const tag = tags(['TestController']);

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    constructor() {
        super();
        console.log('constructor');
    }

    @RequestMapping({
        prefix: '/resource/*'
    })
    public async resource(@Ctx() ctx: Context) {
        return await send(ctx, ctx.path, { root: join(__dirname, '../') });
    }

    @RequestMapping({
        prefix: '/favicon.ico'
    })
    public async favicon(@Ctx() ctx: Context) {
        return await send(ctx, ctx.path, { root: join(__dirname, '../resource/static') });
    }

    // @RequestMapping({
    //     prefix: '/login',
    //     methods: [RequestMappingMethod.POST]
    // })
    // @request(RequestMappingMethod.POST, '/login')
    // @summary('login user auth jwt .')
    // @body(LoginValidation.swaggerDocument)
    // @tag
    // public login(
    //     @Body({ validate: true }) loginForm: LoginValidation,
    //     @Res() response: Response,
    //     @Ctx() ctx: Context
    // ): UserDto {
    //     return PYIExecption(class extends TestController implements PYIThrows {
    //         public errno!: number;
    //         public errmsg!: string;
    //         public async throws() {
    //             const result = {
    //                 id: 1,
    //                 username: 'test',
    //                 age: '1',
    //                 nikename: 'test',
    //                 email: 'test@email.com'
    //             };
    //             // const { secret, token } = this.tokenConfig;
    //             response.append('token', jwt.sign(result, 'pyi', { expiresIn: '24h' }));
    //             return await result;
    //         }
    //     });
    // }

    @RequestMapping({
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
        console.log(2);
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
        prefix: '/info',
        methods: [RequestMappingMethod.POST]
    })
    @request(RequestMappingMethod.POST, '/info')
    @security([{ api_key: [] }])
    @summary('test token')
    @tag
    public info(
        @Ctx() ctx: Context
    ): UserDto {
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                return ctx.state;
            }
        });
    }

    @RequestMapping({
        prefix: '/test',
        // methods: [RequestMappingMethod.GET]
    })
    public async test(
        @QueryParams() gets: any
    ) {
        // console.log(await this.service.findAllUsers());
        return await 'Hello World ...';
    }
}
