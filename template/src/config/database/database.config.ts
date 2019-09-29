import { Configuration, PYIAutoConfiguration } from 'pyi';
import { SequelizeOptions } from 'sequelize-typescript';

@Configuration
export class DataBaseConfiguration extends PYIAutoConfiguration<any> {

    public default: SequelizeOptions;

    constructor() {
        super();
        this.default = {};
        this.default.dialect = 'mysql';
        this.default.replication = {
            read: [
                { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
            ],
            write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
        };
        this.default.pool = {
            max: 20,
            idle: 60 * 1000
        };
    }
}
