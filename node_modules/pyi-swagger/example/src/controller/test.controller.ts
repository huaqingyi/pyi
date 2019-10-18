import {
    RequestMappingMethod, autowired,
    Controller, RequestMapping,
    Ctx, Req, Res, Params, Body,
    PYIExecption, PYIThrows,
    PYIController
} from 'pyi';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';
import { TestVo } from './../vo/test.vo';
import { Context, Request, Response } from 'koa';
import { request, summary, description, tags, body } from '../../../src';

const tag = tags(['Test']);

const userSchema = {
    name: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @autowired
    public nest!: Nest;

    @RequestMapping({
        prefix: '/'
    })
    @request('GET', '/user/register')
    @summary('register user')
    @description('example of api')
    @tag
    @body(userSchema)
    public index(): TestVo {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public async throws() {
                console.log(this.service);
                console.log(this.nest.merge());
                // {"err":false,"data":"Hello PYI ..."}
                return await 'Hello PYI ...';
            }
        });
    }

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET, RequestMappingMethod.POST]
    })
    public test(
        @Ctx() ctx: Context,
        @Req() req: Request,
        @Res() res: Response,
        @Params() params: any,
        @Body() body: any
    ): TestVo {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1004;
                this.errmsg = 'service query findAll sql err.';
                let data = await this.service.testFindAll();
                // {"err":true,"data":{},"errno":1004,"errmsg":"service query findAll sql err."}
                console.log('all', data);
                this.errno = 1005;
                this.errmsg = 'service query test sql err.';
                data = await this.service.testQuery();
                // {"err":true,"data":{},"errno":1005,"errmsg":"service query test sql err."}
                this.errno = 1006;
                this.errmsg = 'service query test sql success try err.';
                throw new Error('test ...');
                // {"err":true,"data":{},"errno":1006,"errmsg":"service query test sql success try err."}
                return data;
            }
        });
    }

    @RequestMapping({
        prefix: '/show'
    })
    public show() {
        return 'test show ...';
    }
}
