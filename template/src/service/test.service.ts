import { Service, autowired, PYIService, PYIExecption } from '../../../src';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';
import { TestVo } from '../vo/test.vo';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    public async testFindAll() {
        // tslint:disable-next-line:max-classes-per-file
        return TestService.Execption(class extends TestService implements PYIExecption {
            public async throws() {
                throw new Error('不开心 ...');
                return await this.db.table(Test).findAll().then((row) => {
                    return row.map((resp) => resp.toJSON());
                });
            }
        });
        return await this.db.table(Test).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
