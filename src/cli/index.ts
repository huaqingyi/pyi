#!/usr/bin / env node

import { join, dirname } from 'path';
import { createWriteStream, existsSync, createReadStream, statSync } from 'fs';
import { green, red } from 'colors';
import moment from 'moment';
import request from 'request';
import { Extract } from 'unzip';
import { remove, mkdir, copy } from 'fs-extra';
import { exec } from 'child_process';

import { Command, Execute } from 'yicommand';
import Typescript from 'typescript';
import { find } from 'lodash';
import { PYIBuilder } from './builder';
import { PYICoreClass } from '../core/pyi';
import { PYIApplication } from '../decorators/application';

@Command({
    context: 'PYI Framework ...',
    version: require('../../package.json').version
})
export class TestCommand {

    private tsconfigPath?: string;

    @Execute('create <path>')
    public async created(path: string) {
        if (!path) { return await console.log(red('not have project name ...')); }
        await console.log(green(
            'download https://github.com/huaqingyi/pyi-template/archive/master.zip ...'
        ));
        const time = moment().format('YYYY-MM-DD HH');
        const pack = join(__dirname, `../.temp/${time}.zip`);
        if (!existsSync(pack)) {
            console.log(green(
                'redownload https://github.com/huaqingyi/pyi-template/archive/master.zip ...'
            ));
            await new Promise((r) => remove(dirname(pack), r));
            await new Promise((r) => mkdir(dirname(pack), r));
            await new Promise((r) => request('http://github.com/huaqingyi/pyi-template/archive/master.zip')
                .pipe(createWriteStream(pack)).on('close', r));
        }
        await console.log(green(
            'download success ...'
        ));

        const unzipdir = join(dirname(pack), 'resource');
        const packdir = join(unzipdir, 'pyi-template-master');

        await new Promise((r) => createReadStream(pack)
            .pipe(Extract({ path: unzipdir })).on('close', r));

        await console.log(green(
            'unzip success ...'
        ));
        const pdir = join(process.cwd(), path);

        await copy(packdir, pdir);

        await console.log(green(
            'copy success ...'
        ));

        return await exec(`cd ${pdir} && npm i`);
    }

    @Execute('start [application]')
    public async start(application: string) {
        if (statSync(application).isFile()) {
            const Application: PYICoreClass<PYIApplication> = find(
                await import(join(process.cwd(), application)),
                ({ _base }) => _base && _base() === PYIApplication
            );
            if (!Application) {
                throw new Error('is not bootstrap application ...');
            } else {
                const path = dirname(join(process.cwd(), application));
                const { config } = Typescript.readConfigFile(
                    join(`${path}`, 'tsconfig.json'),
                    Typescript.sys.readFile
                );
                const builder = new PYIBuilder(path, join(path, '.runtime'), config);
                await builder.build();
                // const app = new Application();
                // app.setResource(builder.outputs);
                // await app.bootstrap();
            }
        } else {
            throw new Error('is not bootstrap file ...');
        }
    }
}
