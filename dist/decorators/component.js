"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const core_1 = require("../core");
const configuration_1 = require("./configuration");
/**
 * Component base
 */
class PYIComponent extends core_1.PYICore {
    constructor(...props) { super(); }
    static _root() {
        return PYIComponent;
    }
}
exports.PYIComponent = PYIComponent;
function Component(config) {
    const { _root } = config;
    /**
     * 如果是直接修饰类
     */
    if (_root && lodash_1.isFunction(_root) && _root() === PYIComponent) {
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
        target.constructor.prototype[key] = instance;
        if (params._root && lodash_1.isFunction(params._root)) {
            if (params._root() === configuration_1.PYIAutoConfiguration ||
                params._root() === configuration_1.PYIAutoAppConfiguration) {
                (async () => {
                    instance = await instance._runtime();
                    target.constructor.prototype[key] = await instance;
                })();
            }
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
}
exports.autowired = autowired;

//# sourceMappingURL=../sourcemaps/decorators/component.js.map
