import { Component, mixin, PYIComponent } from '../../src';
import { Connection } from 'typeorm';
import { DatabaseConfiguraion } from '../configuration/database';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
@Component
export class Database extends mixin(PYIComponent, Connection) {
    
    constructor(public configuration: DatabaseConfiguraion){
        super(configuration);
    }
}