import { PYIAutoConfiguration } from 'pyi';
import { SequelizeOptions } from 'sequelize-typescript';
export declare class DataBaseConfiguration extends PYIAutoConfiguration<any> {
    default: SequelizeOptions;
    constructor();
}
