import { Service, autowired, PYIService, PYIThrows, PYIExecption, throws } from 'pyi';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    @throws
    public async testFindAll() {
        // tslint:disable-next-line:max-classes-per-file
        return PYIExecption(class extends TestService implements PYIThrows {
            public async throws() {
                // throw new Error('不开心 ...');
                return await this.db.table(Test).findAll().then((row) => {
                    return row.map((resp) => resp.toJSON());
                });
            }
        });
        // return await this.db.table(Test).findAll().then((row) => {
        //     return row.map((resp) => resp.toJSON());
        // });
    }

    public async testQuery() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
