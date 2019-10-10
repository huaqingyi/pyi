/// <reference types="node" />
import { PYIBase } from '../core';
import { Socket } from 'net';
export declare abstract class PYIServerConnection extends PYIBase {
    static _pyi(): {};
    static _extends(): typeof PYIServerConnection;
    constructor(sock: Socket, app: any);
}
export declare function Connection(target: any, key?: string): any;
