/// <reference types="node" />
import { LibsBase } from "./libsbase";
import webpack from 'webpack';
export declare class Webpack extends LibsBase {
    /**
     * build config import
     * @param config configpath or webpack.Configuration
     */
    runtime(config?: string | webpack.Configuration): Promise<NodeJS.ReadWriteStream>;
}
