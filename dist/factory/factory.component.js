"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const decorators_1 = require("../decorators");
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
    async _input(target) {
        this.target = target;
    }
    _base() {
        return FactoryComponent;
    }
    async _output() {
        let instance;
        if ((this.component._base && lodash_1.isFunction(this.component._base) && this.component._base() === decorators_1.PYIConfiguration) ||
            (this.component._base && lodash_1.isFunction(this.component._base) && this.component._base() === decorators_1.PYIAppConfiguration)) {
            switch (this.type) {
                case ComponentWiredType.AUTOWIRED:
                    instance = await this.component._pyiruntime(this.props);
                    break;
                case ComponentWiredType.AUTOCONNECT:
                    instance = await this.component._pyiconnect(this.props);
                    break;
            }
            instance = await instance._pyiruntime();
        }
        else {
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
exports.FactoryComponent = FactoryComponent;

//# sourceMappingURL=../sourcemaps/factory/factory.component.js.map
