import { BaseDriver, ActionMetadata, Action, RoutingControllersOptions } from 'routing-controllers';
import { InterceptorMetadata } from 'routing-controllers/metadata/InterceptorMetadata';
export * from 'routing-controllers';
/**
 * Registers controllers and middlewares in the given server framework.
 */
export declare class RoutingControllers<T extends BaseDriver> {
    private driver;
    private options;
    /**
     * Used to check and handle controller action parameters.
     */
    private parameterHandler;
    /**
     * Used to build metadata objects for controllers and middlewares.
     */
    private metadataBuilder;
    /**
     * Global interceptors run on each controller action.
     */
    private interceptors;
    constructor(driver: T, options: RoutingControllersOptions);
    /**
     * Initializes the things driver needs before routes and middleware registration.
     */
    initialize(): this;
    /**
     * Registers all given interceptors.
     */
    registerInterceptors(classes?: Function[]): this;
    /**
     * Registers all given controllers and actions from those controllers.
     */
    registerControllers(classes?: Function[]): this;
    /**
     * Registers post-execution middlewares in the driver.
     */
    registerMiddlewares(type: 'before' | 'after', classes?: Function[]): this;
    /**
     * Executes given controller action.
     */
    protected executeAction(actionMetadata: ActionMetadata, action: Action, interceptorFns: Function[]): Promise<any>;
    /**
     * Handles result of the action method execution.
     */
    protected handleCallMethodResult(result: any, action: ActionMetadata, options: Action, interceptorFns: Function[]): any;
    /**
     * Creates interceptors from the given 'use interceptors'.
     */
    protected prepareInterceptors(uses: InterceptorMetadata[]): Function[];
}
/**
 * Registers all loaded actions in your express application.
 */
export declare function createExecutor<T extends BaseDriver>(driver: T, options?: RoutingControllersOptions): void;
