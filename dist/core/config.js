"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_1 = require("../decorators/configuration");
class ConfigurationServer {
}
exports.ConfigurationServer = ConfigurationServer;
// tslint:disable-next-line:max-classes-per-file
class AppConfigOption extends ConfigurationServer {
    constructor(...props) {
        super();
        this.entry = '';
        this.output = '';
        this.resolve = {
            extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
        };
        this.pyi = {};
        this.compilerOptions = {
            charset: 'utf8',
            declaration: false,
            noImplicitAny: false,
            target: 'esnext',
            module: 'commonjs',
            lib: [
                'es7',
                'es2018',
                'es2018.promise',
                'es2018.regexp'
            ],
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            esModuleInterop: true
        };
        this.server = {};
    }
}
exports.AppConfigOption = AppConfigOption;
// tslint:disable-next-line:max-classes-per-file
class PYIAutoAppConfiguration extends configuration_1.PYIAutoConfiguration {
    constructor(config, props) {
        super();
        this.default = config;
    }
    static _extends() {
        return PYIAutoAppConfiguration;
    }
}
exports.PYIAutoAppConfiguration = PYIAutoAppConfiguration;

//# sourceMappingURL=../sourcemaps/core/config.js.map
