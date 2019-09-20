import { Controller as PController, RequestMapping, RequestMappingMethod, autowired, PYIController } from '../../../../src';
import { Service } from './service';

@PController
export class Controller extends PYIController {

    @autowired
    public service!: Service;

    @RequestMapping({
        prefix: '/'
    })
    public async index() {
        console.log(this.service);
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
