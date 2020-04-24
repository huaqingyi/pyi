import { Configuration, PYIConfiguration } from '/Users/yihuaqing/Desktop/yihq/pyi/src';
import { SequelizeOptions } from 'sequelize-typescript';
import { ReplicationOptions, PoolOptions, Dialect } from 'sequelize/types';

@Configuration
export class DataBaseConfiguration extends PYIConfiguration implements SequelizeOptions {
    public dialect: Dialect;
    public replication: ReplicationOptions;
    public pool: PoolOptions;

    constructor() {
        super();
        this.dialect = 'mysql';
        this.replication = {
            read: [
                { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
            ],
            write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
        };
        this.pool = {
            max: 20,
            idle: 60 * 1000
        };
    }
}
