import { config } from 'dotenv';
import { dirname, join } from 'path';
import { ConfigurationProperties } from '../decorators/properties';
import { existsSync, mkdirpSync, readFileSync, writeFileSync } from 'fs-extra';
import { map, isNaN } from 'lodash';
import { watch } from 'chokidar';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export class ApplicationLoaded {
    public configuration: ConfigurationProperties;
    
    constructor() {
        this.configuration = this.dotenv();
    }

    public dotenv() {
        const [_node, path, ...args] = process.argv;
        const APP_PATH = dirname(path);
        let mode = 'development';
        const idx = args.indexOf('--mode');
        if (idx !== -1) mode = args.slice(idx + 1, idx + 2).pop() || 'development';
        const env = join(APP_PATH, `.env.${mode}`);
        const configuration: any = config({ path: env })?.parsed || {};
        const cts = Object.keys(configuration).map(v => `'${v}'`).join(' | ');
        const template = [
            `import { useProperties, properties, ConfigurationProperties } from 'pyi';`, ``,
            `declare module 'pyi' {`,
            `    interface ConfigurationProperties {`,
            ...Object.keys(configuration).map(c => {
                let type = 'string';
                if (['true', 'false'].indexOf(configuration[c]) !== -1) {
                    type = 'boolean';
                    configuration[c] = 'true' === configuration[c] ? true : false;
                };
                if (isNaN(Number(configuration[c]))) {
                    type = 'number';
                    configuration[c] = Number(configuration[c]);
                }
                try {
                    type = typeof (JSON.parse(configuration[c]));
                    configuration[c] = JSON.parse(configuration[c]);
                } catch (err) { type = 'string'; }
                return `        ${c}: ${type};`;
            }),
            `    }`,
            `    function useProperties<T = any>(key: ${cts}): T;`,
            `    function useProperties<T = any>(): T;`,
            `    function properties<T = any>(key: ${cts}): (target: any, key: string) => void;`,
            `    function properties(target: any, key: string);`,
            `}`,
        ];
        const types = join(APP_PATH, 'types');
        if (!existsSync(types)) mkdirpSync(types);
        writeFileSync(join(types, '_config.d.ts'), template.join('\n'));
        return configuration;
    }

    public async loaded() {
        // watch()
    }
}
