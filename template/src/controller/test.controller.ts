import {
    RequestMappingMethod, autowired,
    Controller, RequestMapping,
    Ctx, Req, Res, Params, Body,
    PYIController,
    PYIExecption
} from '../../../src';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';
import { TestVo } from './../vo/test.vo';
import { Context, Request, Response } from 'koa';

@Controller
export class TestController extends PYIController {

    @autowired
    public service!: TestService;

    @autowired
    public nest!: Nest;

    @RequestMapping({
        prefix: '/'
    })
    public async index() {
        // tslint:disable-next-line:max-classes-per-file
        return TestController.Execption(class extends TestController implements PYIExecption {
            public async throws() {
                console.log(this.service);
                console.log(this.nest.merge());
                return await 'Hello World ...';
            }
        }, TestVo);
    }

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET, RequestMappingMethod.POST]
    })
    public async test(
        @Ctx() ctx: Context,
        @Req() req: Request,
        @Res() res: Response,
        @Params() params: any,
        @Body() body: any
    ) {
        // tslint:disable-next-line:max-classes-per-file
        return TestController.Execption(class extends TestController implements PYIExecption {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1004;
                this.errmsg = 'service query findAll sql err.';
                let data = await this.service.testFindAll();
                console.log('all', data);
                this.errno = 1005;
                this.errmsg = 'service query test sql err.';
                data = await this.service.testQuery();
                this.errno = 1006;
                this.errmsg = 'service query test sql success try err.';
                throw new Error('test ...');
                return data;
            }
        }, TestVo);
    }
}
