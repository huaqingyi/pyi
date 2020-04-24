import 'reflect-metadata';
import { PYIApplication } from './application';
import { PYIApp } from '../core/pyi';
import { PYIAppConfiguration } from '../decorators';
import { FactoryComponent } from '../factory';
export declare class PYIBuilder {
    private app;
    private srcpath;
    private destpath;
    comps: PYIApp[];
    mode: string;
    config: PYIAppConfiguration;
    constructor(app: PYIApplication<any, any>, srcpath: string[], destpath: string);
    build(): Promise<void>;
    configrationInit(): Promise<PYIAppConfiguration<any>>;
    factoryComponent(factorys: FactoryComponent[]): Promise<FactoryComponent[]>;
    addFile(path: string): Promise<false | any[]>;
}
