import { PYIComponent } from 'pyi';
import { Sequelize, SequelizeOptions, ModelCtor } from 'sequelize-typescript';
import { DataBaseConfiguration } from '../config/database/database.config';
export declare class DataBase extends PYIComponent<DataBaseConfiguration> {
    props: DataBaseConfiguration;
    db: Sequelize;
    constructor(props: SequelizeOptions);
    instance(): Sequelize;
    table(model: ModelCtor): ModelCtor;
}
