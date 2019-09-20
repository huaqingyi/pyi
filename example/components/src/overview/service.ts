import { Service as PService, autowired, PYIService } from '../../../../src';
import { DataBase } from '../components/database';
import { Model } from './model';

@PService
export class Service extends PYIService {

    @autowired
    public db!: DataBase;

    public async testFindAll() {
        return await this.db.table(Model).findAll().then((row) => {
            return row.map((resp) => resp.toJSON());
        });
    }

    public async testQuery() {
        const [data] = await this.db.instance().query(`SELECT * FROM test`);
        return data;
    }
}
