import { Controller, RequestMapping, RequestMappingMethod, autowired, PYIController, HttpError } from '../../../../src';
import { TestService } from '../service/test.service';
import { Nest } from '../components/nest';

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
        console.log(this.service);
        console.log(this.nest.merge());
        return await 'Hello World ...';
    }

    @RequestMapping({
        prefix: '/test',
        methods: [RequestMappingMethod.GET, RequestMappingMethod.POST]
    })
    public async test() {

        const data = await this.service.testFindAll();
        console.log(`findAll: `, data);
        return data;

        const data1 = await this.service.testQuery();
        console.log(`test query: `, data1);
        return data1;

        return await 'Hello World For Test ...';
    }
}
