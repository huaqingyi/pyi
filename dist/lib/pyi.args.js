"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const args_1 = __importDefault(require("args"));
const core_1 = require("../core");
class PYIArgsOption {
    constructor() {
        this.config = new core_1.AppConfigOption();
    }
}
exports.PYIArgsOption = PYIArgsOption;
// tslint:disable-next-line:max-classes-per-file
class PYIArgs extends PYIArgsOption {
    constructor() {
        super();
        args_1.default.option('mode', 'The application running type, default is development [development, production, ${your mode}]', 'development').option('watch', 'The application running watch, default app config').option('port', 'The application listen port, default app config').option('runtime', 'The application runing build to es5, default app config .');
        const { mode, watch, port, runtime } = args_1.default.parse(process.argv);
        this.mode = mode;
        this.port = port;
        this.watch = Boolean(watch);
        this.runtime = Boolean(runtime);
        this.config.mode = this.mode;
    }
    static register() {
        if (!PYIArgs._this) {
            PYIArgs._this = new PYIArgs();
        }
        return PYIArgs._this;
    }
    static reflact() {
        return PYIArgs.register();
    }
    static reset(config) {
        if (PYIArgs._this.mode) {
            config.mode = PYIArgs._this.mode;
        }
        if (PYIArgs._this.port) {
            config.server.port = PYIArgs._this.port;
        }
        if (PYIArgs._this.watch) {
            config.watch = PYIArgs._this.watch;
        }
        if (PYIArgs._this.runtime) {
            config.runtime = PYIArgs._this.runtime;
        }
        return PYIArgs._this.config = config;
    }
}
exports.PYIArgs = PYIArgs;

//# sourceMappingURL=../sourcemaps/lib/pyi.args.js.map
