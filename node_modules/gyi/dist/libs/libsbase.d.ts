/// <reference types="node" />
import { Gulp } from "gulp";
export interface LibsRuntime {
    runtime(...args: any): any | Promise<any>;
}
export declare class LibsBase implements LibsRuntime {
    protected gulp: NodeJS.ReadWriteStream | Gulp;
    constructor(gulp: NodeJS.ReadWriteStream | Gulp);
    runtime(): void;
}
