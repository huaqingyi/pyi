"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function Configuration(props) {
    if (props._base && props._base() === PYIConfiguration ||
        props._base && props._base() === PYIAppConfiguration) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.Configuration = Configuration;
class PYIConfiguration extends core_1.PYICore {
    static _base() {
        return PYIConfiguration;
    }
    _pyiruntime() {
        let mode = 'development';
        if (process.env.NODE_ENV) {
            mode = process.env.NODE_ENV;
        }
        if (this[this.mode || mode]) {
            const resp = this[this.mode || mode]();
            if (resp.then) {
                return resp.then(() => this).catch(() => this);
            }
        }
        return this;
    }
}
exports.PYIConfiguration = PYIConfiguration;
class PYIAppConfiguration extends PYIConfiguration {
    constructor() {
        super();
        this.controllers = [];
        this.middlewares = [];
        this.interceptors = [];
        this.plugins = [];
        this.defaultErrorHandler = true;
        this.port = 4000;
        this.host = 'localhost';
    }
    static _base() {
        return PYIAppConfiguration;
    }
    _pyiruntime() {
        const resp = this[this.mode]();
        if (resp.then) {
            return resp.then(() => this).catch(() => this);
        }
        return this;
    }
}
exports.PYIAppConfiguration = PYIAppConfiguration;

//# sourceMappingURL=../sourcemaps/decorators/configuration.js.map
