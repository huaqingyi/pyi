#!/usr/bin/env node

import { join, dirname } from 'path';
import args from 'args';
import { createWriteStream, existsSync, createReadStream } from 'fs';
import { green, red } from 'colors';
import moment from 'moment';
import request from 'request';
import { Extract } from 'unzip';
import { remove, mkdir, copy } from 'fs-extra';
import { exec } from 'child_process';

args.command('create', 'create new project ...', async (name, sub, options) => {
    if (!sub[0]) { return await console.log(red('not have project name ...')); }
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
    const pdir = join(process.cwd(), sub[0]);

    await copy(packdir, pdir);

    await console.log(green(
        'copy success ...'
    ));

    return await exec(`cd ${pdir} && npm i`);
});

args.parse(process.argv);
