import args from 'args';
import { AppConfigOption } from '../core';

export abstract class PYIArgsOption {
    public mode!: string;
    public watch?: boolean;
    public runtime?: boolean;
    public port?: number;
    public config: AppConfigOption;

    constructor() {
        this.config = new AppConfigOption();
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
        if (PYIArgs._this.mode) { config.mode = PYIArgs._this.mode; }
        if (PYIArgs._this.port) { config.server.port = PYIArgs._this.port; }
        if (PYIArgs._this.watch) { config.watch = PYIArgs._this.watch; }
        if (PYIArgs._this.runtime) { config.runtime = PYIArgs._this.runtime; }
        return PYIArgs._this.config = config;
    }

    constructor() {
        super();
        args.option(
            'mode',
            'The application running type, default is development [development, production, ${your mode}]',
            'development'
        ).option(
            'watch',
            'The application running watch, default app config'
        ).option(
            'port',
            'The application listen port, default app config'
        ).option('runtime', 'The application runing build to es5, default app config .');

        const { mode, watch, port, runtime } = args.parse(process.argv);
        this.mode = mode;
        this.port = port;
        this.watch = Boolean(watch);
        this.runtime = Boolean(runtime);
        this.config.mode = this.mode;
    }
}
