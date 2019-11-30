export class Base {

}

export class TBase {

}

export type BaseClass<V> = (new (...args: any[]) => V & Base) & typeof Base;

function Component <VC extends BaseClass<Base>>(target: VC): VC {
    return target as any;
}

@Component
export class Test extends Base {

}
