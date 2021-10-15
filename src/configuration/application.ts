import { dirname } from 'path';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export class ApplicationConfiguration {
    public APPLICATION_PATH: string;
    public APP_PATH: string;
    public APP_AUOTLOAD: string[];
    public APP_RUNTIME: string;
    public PORT: number;
    public HOST: string;
    public mode: string;

    constructor() {
        const [_node, path] = process.argv;
        this.APPLICATION_PATH = path;
        this.APP_PATH = dirname(this.APPLICATION_PATH);
        this.APP_AUOTLOAD = ['ts', 'tsx', 'js', 'jsx', 'ejs'];
        this.APP_RUNTIME = 'runtime';
        this.PORT = 7001;
        this.HOST = 'localhost';
        this.mode = 'development';
    }
}
