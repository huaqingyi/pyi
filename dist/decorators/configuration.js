"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = exports.PYIAppConfiguration = exports.PYIConfiguration = void 0;
const core_1 = require("../core");
const lodash_1 = require("lodash");
/**
 * Component base
 */
class PYIConfiguration extends core_1.PYICore {
    static _base() {
        return PYIConfiguration;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIConfiguration = PYIConfiguration;
class PYIAppConfiguration extends core_1.PYICore {
    constructor(props) {
        super();
        this.controllers = [];
    }
    static _base() {
        return PYIAppConfiguration;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIAppConfiguration = PYIAppConfiguration;
function Configuration(props) {
    const base = props && props._base && lodash_1.isFunction(props._base) && props._base();
    switch (base) {
        case PYIConfiguration:
            {
                return props;
            }
            ;
        case PYIAppConfiguration:
            {
                return props;
            }
            ;
        default: return (target) => {
            return target;
        };
    }
}
exports.Configuration = Configuration;

//# sourceMappingURL=../sourcemaps/decorators/configuration.js.map
