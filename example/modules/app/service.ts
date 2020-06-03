import { Service, PYIService, autowired } from '../../../src';
import { DBComponent } from '../common/components/db.component';
import { User } from '../common/models/user.model';

@Service
export class TestService extends PYIService {

    @autowired
    public database!: DBComponent;

    public async findAllUsers() {
        return await this.database.table(User).findAll().then((row: any) => {
            return row.map((resp: any) => resp.toJSON());
        });
    }

    public async findUser() {
        let data: any = {};
        [data] = await this.database.instance().query(`SELECT * FROM test1`);
        return data;
    }
}
