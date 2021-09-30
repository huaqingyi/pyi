import { config } from 'dotenv';
import { dirname, join } from 'path';
import { watch } from 'chokidar';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export class ApplicationLoaded {
    constructor() {
        const [_node, path, ...args] = process.argv;
        const APP_PATH = dirname(path);
        let mode = 'development';
        const idx = args.indexOf('--mode');
        if (idx !== -1) mode = args.slice(idx + 1, idx + 2).pop() || 'development';
        const env = join(APP_PATH, `.env.${mode}`);
        // console.log(config({ path: env }));
    }

    public async loaded() {
        // watch()
    }
}
