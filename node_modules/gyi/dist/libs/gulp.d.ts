import { SrcMethod, DestMethod, WatchMethod } from 'gulp';
import * as vfs from "vinyl-fs";
import Undertaker from "undertaker";
export declare class Gulp extends Undertaker {
    src: SrcMethod;
    dest: DestMethod;
    symlink: typeof vfs.symlink;
    watch: WatchMethod;
}
