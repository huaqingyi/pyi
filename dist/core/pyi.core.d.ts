/// <reference types="node" />
/// <reference types="koa-session" />
import { Application } from './app.core';
import jwt from 'jsonwebtoken';
import { JWTOptions } from '../decorators';
import { Context } from 'koa';
export interface PYICoreApp {
    [x: string]: any;
}
export declare abstract class PYICore implements PYICoreApp {
    static __proto__: any;
    static _pyi(): {};
    static _root(): PYICoreApp;
    static _extends(): any;
    static _runtime(): typeof PYICore;
    protected static _this: PYICore;
    mode: string;
    success: (...args: any) => any;
    debug: (...args: any) => any;
    pending: (...args: any) => any;
    fatal: (...args: any) => any;
    watch: (...args: any) => any;
    complete: (...args: any) => any;
    error: (...args: any) => any;
    app: Application;
    private _dto;
    dto: boolean;
    readonly config: import("../decorators").PYIAutoAppConfiguration<{}>;
    readonly tokenConfig: JWTOptions;
    readonly token: {
        translate: (token: string) => string | object;
        sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options?: jwt.SignOptions | undefined): string;
        sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, callback: jwt.SignCallback): void;
        sign(payload: string | object | Buffer, secretOrPrivateKey: jwt.Secret, options: jwt.SignOptions, callback: jwt.SignCallback): void;
        verify(token: string, secretOrPublicKey: jwt.Secret, options?: jwt.VerifyOptions | undefined): string | object;
        verify(token: string, secretOrPublicKey: string | Buffer | {
            key: string | Buffer;
            passphrase: string;
        } | jwt.GetPublicKeyOrSecret, callback?: jwt.VerifyCallback | undefined): void;
        verify(token: string, secretOrPublicKey: string | Buffer | {
            key: string | Buffer;
            passphrase: string;
        } | jwt.GetPublicKeyOrSecret, options?: jwt.VerifyOptions | undefined, callback?: jwt.VerifyCallback | undefined): void;
        decode(token: string, options?: jwt.DecodeOptions | undefined): string | {
            [key: string]: any;
        } | null;
        JsonWebTokenError: typeof jwt.JsonWebTokenError;
        TokenExpiredError: typeof jwt.TokenExpiredError;
        NotBeforeError: typeof jwt.NotBeforeError;
    };
    protected ctx: Context;
}
