import { Configuration, PYIConfiguration, properties } from '../../src';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { EntitySchema } from 'typeorm';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@Configuration
export class DatabaseConfiguraion extends PYIConfiguration implements MysqlConnectionOptions {

    @properties('DATABASE_TYPE')
    public type!: 'mysql' | 'mariadb';

    @properties('DATABASE_HOST')
    public host!: string;

    @properties('DATABASE_PORT')
    public port!: number;

    @properties('DATABASE_USERNAME')
    public username!: string;

    @properties('DATABASE_PASSWORD')
    public password!: string;

    @properties('DATABASE_SYNCHRONIZE')
    public synchronize!: boolean;

    @properties('DATABASE_LOGGING')
    public logging!: boolean;

    @properties('DATABASE_DB')
    public database!: string;

    public entities: ((Function | string | EntitySchema<any>))[];

    constructor() {
        super();
        this.entities = [];
    }
}