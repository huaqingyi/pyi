import { Component, PYIComponent, autoconnect } from '/Users/yihuaqing/Desktop/yihq/pyi/src';
import { Sequelize, ModelCtor, SequelizeOptions } from 'sequelize-typescript';
import { DataBaseConfiguration } from '../config/database.config';
import { find } from 'lodash';

// @Component<SequelizeOptions>({
//     dialect: 'mysql',
//     replication: {
//         read: [
//             { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//         ],
//         write: { host: '127.0.0.1', username: 'root', password: 'yihq1105', port: 3306, database: 'test' },
//     },
//     pool: {
//         max: 20,
//         idle: 60 * 1000
//     }
// })
@Component
export class Database extends PYIComponent<DataBaseConfiguration> {

    @autoconnect
    public props!: DataBaseConfiguration;

    public database: Sequelize;

    constructor() {
        super();
        console.log(this.props);
        this.database = new Sequelize(this.props);
    }

    public i() {
        return this.database;
    }

    public table(model: ModelCtor): ModelCtor {
        this.database.addModels([model]);
        return this.database.model(model);
    }

    public test() {
        return 'test component ...';
    }
}
