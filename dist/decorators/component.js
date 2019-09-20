"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const pyi_base_1 = require("../core/pyi.base");
const configuration_1 = require("./configuration");
const core_1 = require("../core");
const lib_1 = require("../lib");
/**
 * Component base
 */
class PYIComponent extends pyi_base_1.PYIBase {
    constructor(...props) { super(); }
    static _extends() {
        return PYIComponent;
    }
}
exports.PYIComponent = PYIComponent;
/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
function Component(config) {
    const { _extends } = config;
    /**
     * 如果是直接修饰类
     */
    if (_extends && lodash_1.isFunction(_extends) && _extends() === PYIComponent) {
        return config;
    }
    else {
        /**
         * 带参数的修饰
         */
        return (target, key) => {
            target.prototype.props = config;
        };
    }
}
exports.Component = Component;
/**
 * 自动注入类
 * @param target classes(主类)
 * @param key prototype(键)
 */
function autowired(target, key) {
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
        let instance = new params(props);
        if (params._extends && lodash_1.isFunction(params._extends)) {
            if (params._extends() === configuration_1.PYIAutoConfiguration ||
                params._extends() === core_1.PYIAutoAppConfiguration) {
                instance = instance._runtime(lib_1.PYIArgs.reflact().config);
            }
        }
        target.constructor.prototype[key] = instance;
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
}
exports.autowired = autowired;

//# sourceMappingURL=../sourcemaps/decorators/component.js.map
