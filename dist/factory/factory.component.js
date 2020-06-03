"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryComponent = exports.ComponentWiredType = void 0;
const colors_1 = require("colors");
const core_1 = require("../core");
const lodash_1 = require("lodash");
var ComponentWiredType;
(function (ComponentWiredType) {
    ComponentWiredType["AUTOCONNECT"] = "autoconnect";
    ComponentWiredType["AUTOWIRED"] = "autowired";
})(ComponentWiredType = exports.ComponentWiredType || (exports.ComponentWiredType = {}));
class FactoryComponent extends core_1.PYICore {
    constructor(key, component, type, props) {
        super();
        this.key = key;
        this.component = component;
        this.type = type;
        this.props = props;
    }
    static _base() {
        return FactoryComponent;
    }
    _base() {
        return FactoryComponent._base();
    }
    async _input(target) {
        this.target = target;
        return await target;
    }
    async _output() {
        let instance;
        const Component = this.component;
        if (Component._root && lodash_1.isFunction(Component._root) && Component._root() === core_1.PYICore) {
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
        }
        else {
            console.log(colors_1.red(`${this.target.name}: ${this.key} [${Component.name}] not extends standard I / O stream .`));
        }
        this.target.prototype[this.key] = instance;
        return await this.target;
    }
}
exports.FactoryComponent = FactoryComponent;

//# sourceMappingURL=../sourcemaps/factory/factory.component.js.map
