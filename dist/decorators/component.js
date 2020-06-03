"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wired = exports.autowired = exports.Component = exports.PYIComponent = void 0;
const factory_component_1 = require("../factory/factory.component");
const lodash_1 = require("lodash");
const core_1 = require("../core");
const configuration_1 = require("./configuration");
class PYIComponent extends core_1.PYICore {
    constructor(props) {
        super();
    }
    static _base() {
        return PYIComponent;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIComponent = PYIComponent;
function Component(props) {
    const base = props && props._base && lodash_1.isFunction(props._base) && props._base();
    if (base === PYIComponent) {
        return props;
    }
    return (target) => {
        return target;
    };
}
exports.Component = Component;
function autowired(props, method) {
    if (method) {
        const C = Reflect.getMetadata('design:type', props, method);
        props[method] = wired(method, C);
        return props[method];
    }
    return (target, kmethod) => {
        const C = Reflect.getMetadata('design:type', target, kmethod);
        target[kmethod] = wired(kmethod, C, props.singleton, props);
        return target[kmethod];
    };
}
exports.autowired = autowired;
function wired(method, injeactor, type, props) {
    if (injeactor._base() === configuration_1.PYIConfiguration ||
        injeactor._base() === configuration_1.PYIAppConfiguration) {
        return new factory_component_1.FactoryComponent(method, injeactor, type ? type : factory_component_1.ComponentWiredType.AUTOCONNECT, props);
    }
    return new factory_component_1.FactoryComponent(method, injeactor, type ? type : factory_component_1.ComponentWiredType.AUTOWIRED, props);
}
exports.wired = wired;

//# sourceMappingURL=../sourcemaps/decorators/component.js.map
