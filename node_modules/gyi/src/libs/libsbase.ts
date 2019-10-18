import { Gulp } from "gulp";

export interface LibsRuntime {
    runtime(...args: any): any | Promise<any>;
}
export class LibsBase implements LibsRuntime {
    protected gulp: NodeJS.ReadWriteStream | Gulp;

    constructor(gulp: NodeJS.ReadWriteStream | Gulp) {
        this.gulp = gulp;
    }

    runtime(){

    }
}