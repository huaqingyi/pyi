import { PYIService } from 'pyi';
import { DataBase } from '../components/database';
export declare class TestService extends PYIService {
    db: DataBase;
    testFindAll(): Promise<any>;
    testQuery(): Promise<any>;
}
