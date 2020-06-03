import 'reflect-metadata';
import { Settings } from 'gulp-typescript';
import merge from 'merge2';
export declare class PYIBuilder {
    private srcpath;
    private destpath;
    private setting;
    outputs: string[];
    constructor(srcpath: string, destpath: string, setting: Settings);
    compile(): merge.Merge2Stream;
    build(): Promise<string[]>;
}
