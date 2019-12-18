import { PYIApplication, PYIAppConfiguration } from '../decorators';
import { PYIChokidar } from '../libs/chokidar';
import { PYIApp } from './pyi';
export declare class Compile {
    private drive;
    private comps;
    constructor(drive: PYIApplication<any, any>);
    scanProject(callback: (file: PYIApp | PYIApp[]) => any): Promise<PYIChokidar>;
    configrationInit(config: PYIAppConfiguration): Promise<PYIAppConfiguration<any>>;
}
