/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export class ApplicationConfiguration {
    public APP_AUOTLOAD: string[];
    public APP_RUNTIME: string;

    constructor() {
        this.APP_AUOTLOAD = ['ts', 'tsx', 'js', 'jsx', 'ejs'];
        this.APP_RUNTIME = 'runtime';
    }
}
