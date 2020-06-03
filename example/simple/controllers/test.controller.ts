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

    @RequestMapping({
        prefix: '/'
    })
    @request(RequestMappingMethod.GET, '/')
    @summary('test get index')
    @tag
    public index(): TestDto {
        return PYIExecption<TestController>({
            throws() {
                console.log(1, this.service);
                return 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/error'
    })
    public err(): TestDto {
        return PYIExecption<TestController>({
            async throws() {
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
        return PYIExecption<TestController>({
            async throws() {
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