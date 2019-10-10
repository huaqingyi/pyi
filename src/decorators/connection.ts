import { PYIBase } from '../core';
import { Socket } from 'net';

export abstract class PYIServerConnection extends PYIBase {

    public static _pyi() {
        return {};
    }

    public static _extends() {
        return PYIServerConnection;
    }

    constructor(sock: Socket, app: any) {
        super();
    }
}

export function Connection(target: any, key?: string) {
    return target;
}
