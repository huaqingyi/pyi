"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const pyi_base_1 = require("../core/pyi.base");
const config_1 = require("../config");
/**
 * Component base
 */
class PYIAutoConfiguration extends pyi_base_1.PYIBase {
    constructor(...props) { super(); }
    static _extends() {
        return PYIAutoConfiguration;
    }
    _runtime(config) {
        const current = config.mode;
        if (!this[current]) {
            if (!this.default) {
                throw Error('configuration not use mode and not have default .');
            }
            return this.default;
        }
        return this[current];
    }
}
exports.PYIAutoConfiguration = PYIAutoConfiguration;
/**
 * This's application plugin or libs, use extends. (插件或者包, 自行扩展)
 * @param config This is contructor argv and classes props, working is auto inject.
 * (config是实例化的参数, 同时也是我们的props, 自动注入类实例.)
 */
function Configuration(config) {
    const { _extends } = config;
    /**
     * 如果是直接修饰类
     */
    if (_extends && lodash_1.isFunction(_extends)) {
        if (_extends() === PYIAutoConfiguration ||
            _extends() === config_1.PYIAutoAppConfiguration) {
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
    else {
        return config;
    }
}
exports.Configuration = Configuration;

//# sourceMappingURL=../sourcemaps/decorators/configuration.js.map
