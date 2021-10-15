import { ConfigurationProperties } from '../decorators/configuration';
import { join, dirname } from 'path';
import { config } from 'dotenv';
import { ApplicationConfiguration } from '../configuration/application';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export function useEnv(mode: string = 'mode') {
    const [_node, _path, ...args] = process.argv;
    const idx = args.indexOf(`--${mode}`);
    if (idx === -1) return mode === 'mode' ? 'development' : false;
    const n = args.slice(idx + 1, idx + 2).pop() || '';
    if (n.slice(0, 2) === '--') return true;
    else return n || 'development';
}

let configuraion: ConfigurationProperties;
export function useConfiguraion() {
    if (!configuraion) {
        const [_node, path] = process.argv;
        const apath = dirname(path);
        const mode = useEnv() as string;
        const env = join(apath, `.env.${mode}`);
        configuraion = config({ path: env })?.parsed || {} as any;
        configuraion = { ...new ApplicationConfiguration(), ...configuraion, mode };
    }
    return configuraion;
}

export function useProperties(propertiesKey?: string) {
    return propertiesKey ? useConfiguraion()[propertiesKey] : useConfiguraion();
}
