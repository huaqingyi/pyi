import args from 'args';
import { AppConfigOption } from '../core';

export abstract class PYIArgsOption {
    public mode: string;
    public watch: boolean;
    public runtime: boolean;
    public port: number;
    public config: AppConfigOption;

    constructor() {
        this.config = new AppConfigOption();
        this.mode = this.config.mode || 'development';
        this.watch = this.config.watch || false;
        this.runtime = this.config.runtime || false;
        this.port = (this.config.server || { port: 4003 }).port || 4003;
    }
}

// tslint:disable-next-line:max-classes-per-file
export class PYIArgs extends PYIArgsOption {

    public static _this: PYIArgs;
    public static register(): PYIArgs {
        if (!PYIArgs._this) { PYIArgs._this = new PYIArgs(); }
        return PYIArgs._this;
    }

    public static reflact() {
        return PYIArgs.register();
    }

    public static reset(config: AppConfigOption) {
        return PYIArgs._this.config = config;
    }

    constructor() {
        super();
        args.option('mode', 'The application running type, default is development [development, production, ${your mode}]', 'development')
            .option('watch', 'The application running watch, default false', false)
            .option('port', 'The application listen port, default app config or 4003', 4003)
            .option('runtime', 'The application runing build to es5 .', false);

        const { mode, watch, port, runtime } = args.parse(process.argv);
        this.mode = mode;
        this.port = port;
        this.watch = Boolean(watch);
        this.runtime = Boolean(runtime);
        this.config.server.port = this.port;
        this.config.mode = this.mode;
        this.config.watch = this.watch;
        this.config.runtime = this.runtime;
    }
}
