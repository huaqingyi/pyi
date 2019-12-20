import { PYICoreClass, PYIPlugins } from '../core';
export interface PYIPluginProps {
    priority?: number;
}
export declare function AutoPlugin<VC extends PYICoreClass<PYIPlugin>>(tprops: VC): VC;
export declare function AutoPlugin<Props = PYIPluginProps>(props: Props & PYIPluginProps): <VC extends PYICoreClass<PYIPlugin>>(target: VC) => VC;
export declare class PYIPlugin<Props = any> extends PYIPlugins {
    static _base(): typeof PYIPlugin;
    props: Props;
}
