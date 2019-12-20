import { PYICore } from '../core';
import { PYIConfiguration, PYIAppConfiguration } from '../decorators';
import { isFunction } from 'lodash';

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

    public async _input(target: any) {
        this.target = target;
    }

    public _base() {
        return FactoryComponent;
    }

    public async _output() {
        let instance: any;
        if (
            (this.component._base && isFunction(this.component._base) && this.component._base() === PYIConfiguration) ||
            (this.component._base && isFunction(this.component._base) && this.component._base() === PYIAppConfiguration)
        ) {
            switch (this.type) {
                case ComponentWiredType.AUTOWIRED:
                    instance = await this.component._pyiruntime(this.props);
                    break;
                case ComponentWiredType.AUTOCONNECT:
                    instance = await this.component._pyiconnect(this.props);
                    break;
            }
            instance = await instance._pyiruntime();
        } else {
            switch (this.type) {
                case ComponentWiredType.AUTOWIRED:
                    instance = this.component._pyiruntime();
                    break;
                case ComponentWiredType.AUTOCONNECT:
                    instance = this.component._pyiconnect();
                    break;
            }
        }
        this.target.prototype[this.key] = instance;
        return this.target;
    }
}
