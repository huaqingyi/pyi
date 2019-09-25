import {
    RequestMappingMethod, autowired,
    Controller, RequestMapping,
    Ctx, Req, Res, Params, Body,
    PYIExecption, PYIThrows,
    PYIController
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
    public index(): TestVo {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestController implements PYIThrows {
            public async throws() {
                console.log(this.service);
                console.log(this.nest.merge());
                // {"err":false,"data":"Hello World ..."}
                return await 'Hello World ...';
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
}
