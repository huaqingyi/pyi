import { PYICoreClass, PYIApp } from '../core/pyi';
import { FactoryComponent } from '../factory';
import { PYIAppConfiguration } from './configuration';
import Koa from 'koa';
export declare class PYIApplication extends Koa implements PYIApp {
    [x: string]: any;
    static __proto__: any;
    static _i: PYIApplication;
    static _root(): PYIApp;
    static _base(): typeof PYIApplication;
    static _extends(): any;
    static _singleton(...props: any): PYIApplication;
    source: string | string[];
    diresource: string[];
    comps: PYIApp[];
    config: PYIAppConfiguration;
    readonly path: string;
    constructor();
    _input(...props: any): PYIApp | Promise<PYIApp>;
    _output(...props: any): PYIApp | Promise<PYIApp>;
    /**
     * import files components
     */
    configrationInit(): Promise<PYIAppConfiguration<any>>;
    factoryComponent(factorys: FactoryComponent[]): Promise<FactoryComponent[]>;
    addFile(path: string): Promise<false | PYIApp[]>;
    setResource(source: string | string[]): void;
    create(): Promise<this>;
    bootstrap(): Promise<void>;
}
export declare function PYIBootstrap<V extends PYICoreClass<PYIApplication>>(props: V): V;
export declare function PYIBootstrap<Props = string | string[]>(paths: Props): <V extends PYICoreClass<PYIApplication>>(props: V) => V;
