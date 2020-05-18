import { Service, PYIService, autowired } from '../../../src';
import { DBComponent } from '../components/db.component';
import { User } from '../models/user.model';

@Service
export class TestService extends PYIService {

    @autowired
    public db!: DBComponent;

    public async findAllUsers() {
        return await this.db.table(User).findAll().then((row: any) => {
            return row.map((resp: any) => resp.toJSON());
        });
    }

    public async findUser() {
        let data: any = {};
        [data] = await this.db.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
