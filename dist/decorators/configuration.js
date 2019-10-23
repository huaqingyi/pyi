"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const core_1 = require("../core");
const dto_1 = require("./dto");
/**
 * Component base
 */
class PYIAutoConfiguration extends core_1.PYICore {
    static _root() {
        return PYIAutoConfiguration;
    }
    async _runtime() {
        if (this[this.mode]) {
            await this[this.mode]();
        }
        return await this;
    }
}
exports.PYIAutoConfiguration = PYIAutoConfiguration;
// tslint:disable-next-line:max-classes-per-file
class PYIAutoAppConfiguration extends core_1.PYICore {
    constructor() {
        super();
        this.enableDto = true;
        this.defaultErrorHandler = false;
        this.globalDto = dto_1.PYIGDto;
        this.session = {
            key: 'pyi:session',
            maxAge: 60 * 60 * 24 * 1000
        };
    }
    static _root() {
        return PYIAutoAppConfiguration;
    }
    async _runtime() {
        if (this[this.mode]) {
            await this[this.mode]();
        }
        return await this;
    }
}
exports.PYIAutoAppConfiguration = PYIAutoAppConfiguration;
function Configuration(config) {
    const { _root } = config;
    /**
     * 如果是直接修饰类
     */
    if (_root && lodash_1.isFunction(_root)) {
        if (_root() === PYIAutoConfiguration ||
            _root() === PYIAutoAppConfiguration) {
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
