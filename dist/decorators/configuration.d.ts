import { PYICore } from '../core';
import { RoutingControllersOptions } from 'routing-controllers';
import { PYIDto } from './dto';
export interface PYIApplicationConfiguration extends RoutingControllersOptions {
    [x: string]: any;
    enableDto?: boolean;
    globalDto?: PYIDto;
}
/**
 * Component base
 */
export declare abstract class PYIAutoConfiguration<Props = {}> extends PYICore {
    [x: string]: any;
    static _pyi: () => any;
    static _root(): typeof PYIAutoConfiguration;
    props?: Props;
    _runtime(): Promise<this>;
}
export declare abstract class PYIAutoAppConfiguration<Props = {}> extends PYICore implements PYIApplicationConfiguration {
    [x: string]: any;
    static _pyi: () => any;
    static _root(): typeof PYIAutoAppConfiguration;
    props?: Props;
    enableDto: boolean;
    globalDto: any & PYIDto;
    constructor();
    _runtime(): Promise<this>;
}
export declare function Configuration<Props = any>(config: Props): any;
