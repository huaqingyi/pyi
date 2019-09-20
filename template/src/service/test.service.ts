import { Service, autowired, PYIService } from '../../../src';
import { DataBase } from '../components/database';
import { Test } from '../model/test.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DataBase;

    public async testFindAll() {
        return await this.db.table(Test).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        const [data] = await this.db.instance().query(`SELECT * FROM test`);
        return data;
    }
}
