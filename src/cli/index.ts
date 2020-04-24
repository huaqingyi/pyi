#!/usr/bin/env node

import { join, dirname } from 'path';
import { createWriteStream, existsSync, createReadStream } from 'fs';
import { green, red } from 'colors';
import moment from 'moment';
import request from 'request';
import { Extract } from 'unzip';
import { remove, mkdir, copy } from 'fs-extra';
import { exec } from 'child_process';

import { Command, Execute } from 'yicommand';
import { PYIBuilder } from './pyi.builder';
import { PYIApplication } from './application';

@Command({
    context: 'PYI Framework ...',
    version: require('../../package.json').version
})
export class TestCommand {

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

    @Execute('start [path]')
    public async start(path?: string) {
        if (!path) {
            path = join(process.cwd(), '.');
        } else {
            path = join(process.cwd(), path.replace(process.cwd(), ''));
        }

        const app: PYIApplication = new PYIApplication();

        const builder = new PYIBuilder(app, [
            join(path, '**/*.ts'),
            join(path, '**/*.tsx'),
            join(path, '**/*.js'),
            join(path, '**/*.jsx'),
        ], join(path, '.runtime'));
        
        await builder.build();
    }
}
