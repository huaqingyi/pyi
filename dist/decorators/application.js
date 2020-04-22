"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const koa_1 = __importDefault(require("koa"));
const extends_1 = require("../extends");
const compile_1 = require("../core/compile");
const colors_1 = require("colors");
const node_emoji_1 = require("node-emoji");
const http_logger_1 = require("../plugins/http.logger");
const signale_1 = require("signale");
const swagger_1 = require("../libs/swagger");
function PYIBootstrap(props) {
    let mode = 'development';
    if (process.env.NODE_ENV) {
        mode = process.env.NODE_ENV;
    }
    if (props._base && props._base() === PYIApplication) {
        props.prototype.mode = mode;
        return props;
    }
    return (target) => {
        target.prototype.props = props;
        return target;
    };
}
exports.PYIBootstrap = PYIBootstrap;
/**
 * 继承 Koa 主类
 */
class PYIApplication extends koa_1.default {
    constructor() {
        super();
        this.logger = new signale_1.Signale();
        // tslint:disable-next-line:no-unused-expression
        this.compile = new compile_1.Compile(this);
        this.run();
        // tslint:disable-next-line:no-empty
        this._bootstrap = () => { };
    }
    static _pyi() {
        return {};
    }
    static _root() {
        return core_1.PYICore;
    }
    static _base() {
        return PYIApplication;
    }
    static _extends() {
        return this.__proto__;
    }
    static _pyiruntime() {
        return this;
    }
    static _connect() {
        if (!this._this) {
            this._this = new this();
        }
        return this._this;
    }
    /**
     * 初始化完成回调
     * @param callback 启动会掉
     */
    async bootstrap(callback) {
        this._bootstrap = callback;
        return await new Promise((r) => {
            this.ready = r;
        });
    }
    /**
     * 启动项目
     */
    async starter() {
        this.listen(this.config.port, this.config.host, () => {
            console.log(`${node_emoji_1.get('kiss')}  ${colors_1.blue(`application running for http://${this.config.host}:${this.config.port}`)}`);
        });
    }
    /**
     * 开始初始化 Application
     */
    async run() {
        await swagger_1.SwaggerInjectService.register();
        console.log(`${node_emoji_1.get('rocket')}  ${colors_1.green(`application onInit runtime ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onInit && await this.onInit();
        console.log(`${node_emoji_1.get('rocket')}  ${colors_1.green(`application scan project ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onScanInit && await this.onScanInit();
        const { config } = await this.compile.scanProject(async (file) => {
            console.log(`${node_emoji_1.get('rainbow')}  ${colors_1.green(`application scan change components ...`)}`);
            // tslint:disable-next-line:no-unused-expression
            this.onScanChange && await this.onScanChange(file);
        });
        console.log(`${node_emoji_1.get('rocket')}  ${colors_1.green(`application scan project config ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onConfigurationInit && await this.onConfigurationInit();
        this.config = await this.compile.configrationInit(config);
        console.log(`${node_emoji_1.get('rocket')}  ${colors_1.green(`application scan project config success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onConfigurationAfter && await this.onConfigurationAfter();
        this.logger = new signale_1.Signale(this.config.debugOptions || {});
        // tslint:disable-next-line:no-empty
        const isPlugins = this.onPluginApplication || (() => { });
        // tslint:disable-next-line:no-unused-expression
        if (await isPlugins(http_logger_1.HttpLogger) !== false) {
            const logger = new http_logger_1.HttpLogger(this);
            await logger.init();
        }
        await this.compile.installPlugins(this.config.plugins);
        await this.compile.useServletAction(this.config.docs);
        const driver = new extends_1.KoaDriver(this);
        await extends_1.createExecutor(driver, {
            ...this.config, development: this.mode === 'development',
        });
        console.log(`${node_emoji_1.get('rocket')}  ${colors_1.green(`application scan project init success ...`)}`);
        // tslint:disable-next-line:no-unused-expression
        this.onInitApplication && await this.onInitApplication();
        // tslint:disable-next-line:no-unused-expression
        this.ready && await this.ready(this);
        await this._bootstrap();
    }
}
exports.PYIApplication = PYIApplication;

//# sourceMappingURL=../sourcemaps/decorators/application.js.map
