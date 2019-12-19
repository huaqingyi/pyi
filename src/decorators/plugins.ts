import { PYIApp, PYICoreClass, PYIPlugins } from '../core';

export interface PYIPluginProps {
    priority?: number;
}

export function AutoPlugin<VC extends PYICoreClass<PYIPlugin>>(tprops: VC): VC;
export function AutoPlugin<Props = PYIPluginProps>(
    props: Props & PYIPluginProps
): <VC extends PYICoreClass<PYIPlugin>>(target: VC) => VC;
export function AutoPlugin<Props extends any>(props: Props) {
    if (props._base && props._base() === PYIPlugin) {
        return props;
    } else {
        return (target: PYIApp) => {
            target.prototype.props = props;
            return target;
        };
    }
}

export class PYIPlugin<Props = any> extends PYIPlugins {
    public static _base() {
        return PYIPlugin;
    }

    public props!: Props;
}
