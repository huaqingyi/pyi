import { config } from 'dotenv';
import { dirname, join } from 'path';
import { ConfigurationProperties } from '../decorators/properties';
import { existsSync, mkdirpSync, writeFileSync, statSync } from 'fs-extra';
import { map, isNaN, isFunction, isRegExp } from 'lodash';
import { watch } from 'chokidar';
import { ApplicationConfiguration } from '../configuration/application';
import { PYIController, CONTROLLER_ACTION_KEY, CONTROLLER_KEY, REQUESTMAPPING_KEY, RequestMappingMethod } from '../decorators/controller';
import { PYITCPController, TCPCONTROLLER_ACTION_KEY, TCPCONTROLLER_KEY, TCPREQUESTMAPPING_KEY } from '../decorators/tcpcontroller';
import { PYIComponent } from '../decorators/component';
import { PYIConfiguration } from '../decorators/configuration';
import { PYIDao } from '../decorators/dao';
import { PYIDto } from '../decorators/dto';
import { PYIService } from '../decorators/service';

/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */
export interface LoadedPacket<T> {
    [name: string]: T;
}

export class ApplicationLoadedPacket {
    public controllers: LoadedPacket<PYIController>;
    public tcpcontrols: LoadedPacket<PYITCPController>;
    public components: PYIComponent[];
    public configurations: PYIConfiguration[];
    public daos: PYIDao[];
    public dtos: PYIDto[];
    public services: PYIService[];
    constructor() {
        this.controllers = {};
        this.tcpcontrols = {};
        this.components = [];
        this.configurations = [];
        this.daos = [];
        this.dtos = [];
        this.services = [];
    }
}

export class ApplicationLoaded {

    public configuration!: ConfigurationProperties;
    public APP_PATH: string;
    public APPLICATION_PATH: string;

    constructor() {
        const [_node, path] = process.argv;
        this.APPLICATION_PATH = path;
        this.APP_PATH = dirname(this.APPLICATION_PATH);
        this.dotenv();
        global.pyi.configuration = this.configuration;
    }

    public dotenv() {
        // loaded env config
        let mode = 'development';
        const [_node, _path, ...args] = process.argv;
        const idx = args.indexOf('--mode');
        if (idx !== -1) mode = args.slice(idx + 1, idx + 2).pop() || 'development';
        const env = join(this.APP_PATH, `.env.${mode}`);
        let configuration: any = config({ path: env })?.parsed || {};
        const cts = Object.keys(configuration).map(v => `'${v}'`).join(' | ');
        // create config .d.ts template
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
                if (!isNaN(Number(configuration[c]))) {
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

        // MERGE DEFAULT APPLICATION CONFIGRUATION ...
        configuration = { ...new ApplicationConfiguration(), ...configuration };

        const types = join(this.APP_PATH, 'types');
        if (!existsSync(types)) mkdirpSync(types);
        writeFileSync(join(types, '_config.d.ts'), template.join('\n'));
        const runtime = join(this.APP_PATH, configuration.APP_RUNTIME);
        global.pyi.RUNTIME_PATH = runtime;
        if (!existsSync(runtime)) mkdirpSync(runtime);
        writeFileSync(join(runtime, 'config.json'), JSON.stringify(configuration, null, 4));
        this.configuration = configuration;
        return configuration;
    }

    public loadedBase(packet: any) {
        const { _base } = packet;
        if (!_base) return false;
        if (!isFunction(_base)) return false;
        return _base();
    }

    public async loaded() {
        const watcher = watch(this.APP_PATH, {
            ignored: path => {
                if (statSync(path).isDirectory()) return false;
                const reg = new RegExp(`.(${this.configuration.APP_AUOTLOAD.join('|')})$`, 'gi');
                if (/.d.ts$/gi.test(path)) return true;
                return !reg.test(path);
            },
        });
        const alps = new ApplicationLoadedPacket();
        await new Promise(r => watcher.on('add', async path => {
            let packets;
            try {
                packets = await import(path);
                if (packets.default) {
                    if (this.loadedBase(packets.default) === PYIController) return alps.controllers[path] = packets.default;
                    if (this.loadedBase(packets.default) === PYITCPController) return alps.tcpcontrols[path] = packets.default;
                }
                return map(packets, packet => {
                    switch (this.loadedBase(packet)) {
                        case PYIComponent: return alps.components.push(packet);
                        case PYIConfiguration: return alps.configurations.push(packet);
                        case PYIDao: return alps.daos.push(packet);
                        case PYIDto: return alps.dtos.push(packet);
                        case PYIService: return alps.services.push(packet);
                    }
                });
            } catch (err) { console.log(err) }
        }).on('ready', r));
        watcher.close();
        const routes: any[] = [];
        map(alps.controllers, (controller, path) => {
            const baseURL = path.replace(join(this.APP_PATH, 'app'), '').replace(new RegExp(`.(${this.configuration.APP_AUOTLOAD.join('|')})$`, 'gi'), '');
            const actions = Reflect.getMetadata(CONTROLLER_ACTION_KEY, controller);
            const m = Reflect.getMetadata(CONTROLLER_KEY, controller);
            map(actions, action => {
                const route = `${baseURL}/${action}`;
                const a = Reflect.getMetadata(REQUESTMAPPING_KEY, (controller as any).prototype, action);
                map(m.prefix ? [m.prefix] : m.prefix, p => {
                    map(a.path ? [a.path] : a.path, ap => {
                        const r: any = {};
                        if (isRegExp(p) || isRegExp(ap)) r.regexp = true;
                        else r.regexp = false;
                        let ac = isRegExp(p) ? p.source : p;
                        ac = ac === '/' ? '' : ac;
                        let bc = isRegExp(ap) ? ap.source : ap;
                        bc = bc === '/' ? '' : bc;
                        const rp = `${ac}/${bc}`.replace(`//${bc}`, `/${bc}`);
                        r.path = `${route}${rp === '/' ? '' : `/${rp}`}`.replace(`//${rp}`, `/${rp}`);
                        r.controller = path;
                        r.action = action;
                        r.methods = a.methods.length === 0 ? m.methods : a.methods;
                        r.methods = r.methods.length === 0 ? [
                            RequestMappingMethod.GET, RequestMappingMethod.POST, RequestMappingMethod.PUT,
                            RequestMappingMethod.PATCH, RequestMappingMethod.DELETE, RequestMappingMethod.COPY,
                        ] : r.methods;
                        routes.push(r);
                    });
                });
            });
        });

        const tcproutes: any[] = [];
        map(alps.tcpcontrols, (controller, path) => {
            const actions = Reflect.getMetadata(TCPCONTROLLER_ACTION_KEY, controller);
            const m = Reflect.getMetadata(TCPCONTROLLER_KEY, controller);
            map(actions, action => {
                const a = Reflect.getMetadata(TCPREQUESTMAPPING_KEY, (controller as any).prototype, action);
                const r: any = {};
                r.path = `${m.cmd}${a.cmd}`;
                r.controller = path;
                r.action = action;
                tcproutes.push(r);
            });
        });

        const runtime = join(this.APP_PATH, this.configuration.APP_RUNTIME);
        writeFileSync(join(runtime, 'routes.json'), JSON.stringify(routes, null, 4));
        writeFileSync(join(runtime, 'sockets.json'), JSON.stringify(tcproutes, null, 4));
        return true;
    }
}
