/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
import { PYICore, PYICoreClass } from '../extensions';

export const TCPCONTROLLER_KEY = Symbol('TCPCONTROLLER_KEY');
export const TCPCONTROLLER_ACTION_KEY = Symbol('TCPCONTROLLER_ACTION_KEY');

export function TCPController<VC extends PYICoreClass<PYITCPController>>(tprops: VC): VC;
export function TCPController(cmd: number): <VC extends PYICoreClass<PYITCPController>>(target: VC) => VC;
export function TCPController<Props extends any>() {
    const [target] = arguments;
    if (target._base && target._base() === PYITCPController) {
        Reflect.defineMetadata(TCPCONTROLLER_KEY, { cmd: '' }, target);
    } else {
        return (target: PYICoreClass<PYITCPController>) => {
            Reflect.defineMetadata(TCPCONTROLLER_KEY, { cmd: arguments[0] }, target);
        };
    }
}

export const TCPREQUESTMAPPING_KEY = Symbol('TCPREQUESTMAPPING_KEY');

export class PYITCPController<Props = any> extends PYICore {
    public static _base() {
        return PYITCPController;
    }
}

export function TCPRequestMapping(cmd: number): any {
    return (target: PYITCPController, key: string) => {
        const actions = Reflect.getMetadata(TCPCONTROLLER_ACTION_KEY, target.constructor) || [];
        actions.push(key);
        Reflect.defineMetadata(TCPCONTROLLER_ACTION_KEY, actions, target.constructor);
        Reflect.defineMetadata(TCPREQUESTMAPPING_KEY, { cmd }, target, key);
        return target;
    };
}
