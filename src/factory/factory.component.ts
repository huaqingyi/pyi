import { red } from 'colors';
import { PYICore } from '../core';
import { isFunction, find, filter } from 'lodash';

export enum ComponentWiredType {
    AUTOCONNECT = 'autoconnect',
    AUTOWIRED = 'autowired'
}

export class FactoryComponent extends PYICore {

    public static _base() {
        return FactoryComponent;
    }

    public target: any;

    constructor(
        public key: string,
        public component: any,
        public type: ComponentWiredType,
        public props?: any
    ) {
        super();
    }

    public _base() {
        return FactoryComponent._base();
    }

    public async _input(target: any) {
        this.target = target;
        return await target;
    }

    public async _output() {
        let instance: any;
        const Component = this.component;
        if (Component._root && isFunction(Component._root) && Component._root() === PYICore) {
            switch (this.type) {
                case ComponentWiredType.AUTOWIRED:
                    const component = new Component();
                    await component._output();
                    instance = await component;
                    break;
                case ComponentWiredType.AUTOCONNECT:
                    instance = await Component._singleton()._output(this.props);
                    break;
            }
        } else {
            console.log(red(
                `${this.target.name}: ${this.key} [${Component.name}] not extends standard I / O stream .`
            ));
        }
        this.target.prototype[this.key] = instance;
        return await this.target;
    }
}
