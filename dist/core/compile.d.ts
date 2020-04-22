import { PYIApplication, PYIAppConfiguration, AppSwaggerJSON } from '../decorators';
import { PYIChokidar } from '../libs/chokidar';
import { PYIApp, PYICoreClass } from './pyi';
import { PYIPlugin } from '../decorators/plugins';
import { FactoryComponent } from '../factory';
export declare class Compile {
    private drive;
    private comps;
    constructor(drive: PYIApplication<any, any>);
    scanProject(callback: (file: PYIApp | PYIApp[]) => any): Promise<PYIChokidar>;
    factoryComponent(factorys: FactoryComponent[]): Promise<FactoryComponent[]>;
    configrationInit(config: PYIAppConfiguration): Promise<PYIAppConfiguration<any>>;
    installPlugins(plugins: Array<PYICoreClass<PYIPlugin>>): Promise<PYICoreClass<PYIPlugin<any>>[]>;
    useServletAction(config: AppSwaggerJSON | false): Promise<false | void>;
}
