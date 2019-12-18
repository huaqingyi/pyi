"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const lodash_1 = require("lodash");
const configuration_1 = require("./configuration");
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
var ComponentWiredType;
(function (ComponentWiredType) {
    ComponentWiredType["AUTOCONNECT"] = "autoconnect";
    ComponentWiredType["AUTOWIRED"] = "autowired";
})(ComponentWiredType = exports.ComponentWiredType || (exports.ComponentWiredType = {}));
function auto(type) {
    return (target, key) => {
        /**
         * 容错
         */
        if (!target.constructor._pyi) {
            target.constructor._pyi = () => ({});
        }
        /**
         * 获取注入类
         */
        const params = Reflect.getMetadata('design:type', target, key);
        /**
         * 是否嵌套依赖
         */
        if (!params._pyi || !params._pyi().autowired) {
            const { props } = params.prototype;
            let instance;
            if ((params._base && lodash_1.isFunction(params._base) && params._base() === configuration_1.PYIConfiguration) ||
                (params._base && lodash_1.isFunction(params._base) && params._base() === configuration_1.PYIAppConfiguration)) {
                (async () => {
                    switch (type) {
                        case ComponentWiredType.AUTOWIRED:
                            instance = await params._pyiruntime(props);
                            break;
                        case ComponentWiredType.AUTOCONNECT:
                            instance = await params._pyiconnect(props);
                            break;
                        default: return target;
                    }
                    instance = await instance._pyiruntime();
                    target.constructor.prototype[key] = await instance;
                })();
            }
            else {
                switch (type) {
                    case ComponentWiredType.AUTOWIRED:
                        instance = params._pyiruntime();
                        break;
                    case ComponentWiredType.AUTOCONNECT:
                        instance = params._pyiconnect();
                        break;
                    default: return target;
                }
                target.constructor.prototype[key] = instance;
            }
        }
        else {
            /**
             * 嵌套依赖
             */
            const _pyi = target.constructor._pyi();
            if (!_pyi.autowired) {
                target.constructor._pyi = () => ({
                    ..._pyi,
                    autowired: [
                        ...(_pyi.autowired || []),
                        key
                    ]
                });
            }
        }
        return target.constructor.prototype[key];
    };
}
exports.auto = auto;
function autowired(target, key) {
    return auto(ComponentWiredType.AUTOWIRED)(target, key);
}
exports.autowired = autowired;
function autoconnect(target, key) {
    return auto(ComponentWiredType.AUTOCONNECT)(target, key);
}
exports.autoconnect = autoconnect;
class PYIComponent extends core_1.PYICore {
    static _base() {
        return PYIComponent;
    }
}
exports.PYIComponent = PYIComponent;

//# sourceMappingURL=../sourcemaps/decorators/component.js.map
