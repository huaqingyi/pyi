import { isFunction, map } from 'lodash';
export * from 'routing-controllers';
import { JsonController, Method, Middleware as RMiddleware, Interceptor as RInterceptor } from 'routing-controllers';
import { ActionType } from 'routing-controllers/metadata/types/ActionType';
import { PYIBase } from '../core/pyi.base';
import { PYIVo } from './impl';

/**
 * Controller ================================
 */
export enum RequestMappingMethod {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH'
}

export interface ControllerConfiguration {
    prefix?: string;
}

export interface ControllerRequestConfiguration extends ControllerConfiguration {
    prefix?: string;
    methods?: string[] | ActionType[];
}

export abstract class PYIController extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIController;
    }

    public static Execption<UseParentClass = any, UsePYIVo = PYIVo>(
        execption: UseParentClass & any, Vo: UsePYIVo & any
    ): any {
        execption.bind(PYIController._this);
        const exinstance = new execption();
        const ex: Promise<any> = exinstance.throws();
        return ex.then((resp) => {
            return new Vo(resp);
        }).catch((err) => {
            const { errno, errmsg } = exinstance;
            return (new Vo()).throws(err, errno, errmsg);
        });
        // return PYIController._this.ctx.vo = vo;
    }

    constructor(...props: any) { super(); }
}

/**
 * Extends for routing-controllers JsonController
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export function Controller<Props = ControllerConfiguration | PYIController>(config: Props): any {
    if (isFunction(config)) {
        JsonController(undefined)(config as any);
    } else {
        return (target: any, key?: string) => {
            const { prefix } = config as ControllerConfiguration;
            JsonController(prefix ? prefix : undefined)(target);
        };
    }
}

/**
 * Extends for routing-controllers ActionType
 * @param config extends routing-controllers config(继承于 routing-controllers 参数)
 */
export function RequestMapping(config: ControllerRequestConfiguration | PYIController, key?: string): any {
    if (key) {
        map(RequestMappingMethod, (m) => {
            Method(m as any, undefined)(config, key);
        });
    } else {
        // tslint:disable-next-line:no-shadowed-variable
        return (target: any, key: string) => {
            const Vo = Reflect.getMetadata('design:returntype', target, key);
            // console.log(vo);
            const { prefix, methods } = config as ControllerRequestConfiguration;
            map(methods && methods.length > 0 ? methods : RequestMappingMethod, (m) => {
                Method(m as ActionType, prefix)(target, key);
            });
        };
    }
}

/**
 * Middleware ===============================================
 */

// tslint:disable-next-line:max-classes-per-file
export abstract class PYIMiddleware extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIMiddleware;
    }

    constructor(...props: any) { super(); }
}

/**
 * Extends for routing-controllers middleware
 * @param options extends routing-controllers middleware
 */
export function Middleware(
    options: {
        type: 'after' | 'before';
        priority?: number;
    }
) {
    return (target: any, key?: string) => {
        RMiddleware(options)(target);
    };
}

// tslint:disable-next-line:max-classes-per-file
export abstract class PYIInterceptor extends PYIBase {
    public static _pyi: () => any;
    public static _extends() {
        return PYIInterceptor;
    }

    constructor(...props: any) { super(); }
}

/**
 * Extends for routing-controllers Interceptor
 * @param options extends routing-controllers Interceptor
 */
export function Interceptor(options?: { priority?: number; }) {
    return (target: any, key?: string) => {
        RInterceptor(options)(target);
    };
}
