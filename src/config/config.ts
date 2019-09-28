import { Settings } from 'gulp-typescript';
import { AuthorizationChecker } from 'routing-controllers/AuthorizationChecker';
import { CurrentUserChecker } from 'routing-controllers/CurrentUserChecker';
import { ValidatorOptions } from 'class-validator';
import { ClassTransformOptions } from 'class-transformer';
import { PYIAutoConfiguration } from '../decorators/configuration';
import { PYIVo, Vo } from '../decorators';

export interface ServerConfig {

    /**
     * Indicates if cors are enabled.
     * This requires installation of additional module (cors for express and kcors for koa).
     */
    cors?: boolean | Object;
    /**
     * Global route prefix, for example '/api'.
     */
    routePrefix?: string;
    /**
     * Indicates if class-transformer should be used to perform serialization / deserialization.
     */
    classTransformer?: boolean;
    /**
     * Global class transformer options passed to class-transformer during classToPlain operation.
     * This operation is being executed when server returns response to user.
     */
    classToPlainTransformOptions?: ClassTransformOptions;
    /**
     * Global class transformer options passed to class-transformer during plainToClass operation.
     * This operation is being executed when parsing user parameters.
     */
    plainToClassTransformOptions?: ClassTransformOptions;
    /**
     * Indicates if class-validator should be used to auto validate objects injected into params.
     * You can also directly pass validator options to enable validator with a given options.
     */
    validation?: boolean | ValidatorOptions;
    /**
     * Indicates if development mode is enabled.
     * By default its enabled if your NODE_ENV is not equal to 'production'.
     */
    development?: boolean;
    /**
     * Indicates if default routing-controller's error handler is enabled or not.
     * Enabled by default.
     */
    defaultErrorHandler?: boolean;
    /**
     * Map of error overrides.
     */
    errorOverridingMap?: {
        [key: string]: any;
    };
    /**
     * Special function used to check user authorization roles per request.
     * Must return true or promise with boolean true resolved for authorization to succeed.
     */
    authorizationChecker?: AuthorizationChecker;
    /**
     * Special function used to get currently authorized user.
     */
    currentUserChecker?: CurrentUserChecker;
    /**
     * Default settings
     */
    defaults?: {
        /**
         * If set, all null responses will return specified status code by default
         */
        nullResultCode?: number;
        /**
         * If set, all undefined responses will return specified status code by default
         */
        undefinedResultCode?: number;
        /**
         * Default param options
         */
        paramOptions?: {
            /**
             * If true, all non-set parameters will be required by default
             */
            required?: boolean;
        };
    };

    defaultVo?: (data: any, err?: Error, errno?: number) => Promise<PYIVo>;

    workers: {
        /**
         * cluster 模式
         */
        cluster: boolean;
        /**
         * 线程数
         */
        thread: number;
        /**
         * 每个server max content, 溢出进入队列
         */
        max: number;
    };
}

export class ConfigurationServer {
    public entry!: string;
    public output!: string;
    public watch!: boolean;
    public mode!: string;
    public runtime!: boolean;
    public resolve!: {
        alias?: Array<{ [x: string]: string }>;
        extensions: string[];
    };
    public pyi!: ServerConfig;
    public compilerOptions!: Settings;
    public server!: {
        historyApiFallback?: boolean,
        hot?: boolean,
        inline?: boolean,
        progress?: boolean,
        port?: number,
        host?: string,
        disableHostCheck?: boolean
    };
}

// tslint:disable-next-line:max-classes-per-file
export class AppConfigOption extends ConfigurationServer {

    constructor(...props: any) {
        super();
        this.entry = '';
        this.output = '';
        this.resolve = {
            extensions: ['.js', '.jsx', '.vue', '.ts', '.tsx']
        };
        this.pyi = {
            workers: {
                cluster: false,
                thread: 0,
                max: 0
            }
        };
        this.pyi.defaultVo = async (data: any, err?: Error, errno?: number) => {
            const DefaultVo = (class extends PYIVo {
                public err!: boolean;
                public data!: any;
            });
            Vo(DefaultVo);
            let resp = new DefaultVo(data);
            if (err) {
                resp = await resp.throws(err, errno);
            }
            return resp;
        };
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

// tslint:disable-next-line:max-classes-per-file
export class PYIAutoAppConfiguration<Props> extends PYIAutoConfiguration<Props> {
    public static _extends() {
        return PYIAutoAppConfiguration;
    }

    public default: AppConfigOption;
    constructor(config: AppConfigOption, props?: Props) {
        super();
        this.default = config;
    }
}
