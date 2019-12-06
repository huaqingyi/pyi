import { Service, PYIService, autoconnect } from '../../src';
import { Database } from '../components/database';
import { User } from '../models/user';

@Service
export class TestService extends PYIService {

    @autoconnect
    public db!: Database;

    public findAll() {
        return this.db.table(User).findAll({ raw: true });
    }
}
