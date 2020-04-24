import { Service, PYIService, autoconnect } from '/Users/yihuaqing/Desktop/yihq/pyi/src';
import { Database } from '/Users/yihuaqing/Desktop/yihq/pyi/example/components/database';
import { User } from '../entity/user';

@Service
export class TestService extends PYIService {

    @autoconnect
    public db!: Database;

    public findAll() {
        return this.db.table(User).findAll({ raw: true });
    }

    public async test() {
        throw new Error('测试 Service Error ...');
        return await { name: 'Hello World ...' };
    }
}
