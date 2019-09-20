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
        this.mode = this.config.mode || 'development';
        this.watch = this.config.watch || false;
        this.runtime = this.config.runtime || false;
        this.port = (this.config.server || { port: 4003 }).port || 4003;
    }
}
exports.PYIArgsOption = PYIArgsOption;
// tslint:disable-next-line:max-classes-per-file
class PYIArgs extends PYIArgsOption {
    constructor() {
        super();
        args_1.default.option('mode', 'The application running type, default is development [development, production, ${your mode}]', 'development')
            .option('watch', 'The application running watch, default false', false)
            .option('port', 'The application listen port, default app config or 4003', 4003)
            .option('runtime', 'The application runing build to es5 .', false);
        const { mode, watch, port, runtime } = args_1.default.parse(process.argv);
        this.mode = mode;
        this.port = port;
        this.watch = Boolean(watch);
        this.runtime = Boolean(runtime);
        this.config.server.port = this.port;
        this.config.mode = this.mode;
        this.config.watch = this.watch;
        this.config.runtime = this.runtime;
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
        return PYIArgs._this.config = config;
    }
}
exports.PYIArgs = PYIArgs;

//# sourceMappingURL=../sourcemaps/lib/pyi.args.js.map
