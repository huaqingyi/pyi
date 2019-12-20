"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const factory_1 = require("../factory");
function Component(props) {
    if (props._base && props._base() === PYIComponent) {
        return props;
    }
    return (target) => {
        target.prototype.props = props;
        return target;
    };
}
exports.Component = Component;
function auto(type) {
    return (target, key) => {
        const params = Reflect.getMetadata('design:type', target, key);
        const { props } = params.prototype;
        target.constructor.prototype[key] = new factory_1.FactoryComponent(key, params, type, props);
        return target.constructor.prototype[key];
    };
}
exports.auto = auto;
function autowired(target, key) {
    return auto(factory_1.ComponentWiredType.AUTOWIRED)(target, key);
}
exports.autowired = autowired;
function autoconnect(target, key) {
    return auto(factory_1.ComponentWiredType.AUTOCONNECT)(target, key);
}
exports.autoconnect = autoconnect;
class PYIComponent extends core_1.PYICore {
    static _base() {
        return PYIComponent;
    }
}
exports.PYIComponent = PYIComponent;

//# sourceMappingURL=../sourcemaps/decorators/component.js.map
