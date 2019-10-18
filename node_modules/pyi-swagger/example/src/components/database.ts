import { Component, PYIComponent, autowired } from 'pyi';
import { Sequelize, SequelizeOptions, ModelCtor } from 'sequelize-typescript';
import { DataBaseConfiguration } from '../config/database/database.config';

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
export class DataBase extends PYIComponent<DataBaseConfiguration> {

    @autowired
    public props!: DataBaseConfiguration;

    public db: Sequelize;

    constructor(props: SequelizeOptions) {
        super(props);
        this.db = new Sequelize(props);
    }

    public instance() {
        return this.db;
    }

    public table(model: ModelCtor): ModelCtor {
        this.db.addModels([model]);
        return this.db.model(model);
    }
}
