#!/usr/bin/env node

import { fork } from 'child_process';
import { join } from 'path';
import args from 'args';
import { src, dest } from 'gulp';
import install from 'gulp-install';
import { readFileSync, writeFileSync } from 'fs';
import { green, yellow, red } from 'colors';

args.command('create', 'create new project ...', async (name, sub, options) => {
    const copy = async (srcpath: string | string[], destpath: string) => {
        const task = src(srcpath);
        return await new Promise((r) => {
            task.pipe(dest(destpath)).on('end', r).pipe(install());
        });
    };
    if (sub.length === 1) {
        const [project] = sub;
        const path = join(process.cwd(), project);
        await copy(join(__dirname, '../../template/**/*.*'), path);
        let config = readFileSync(
            join(__dirname, '../../template/package.json'),
            { encoding: 'utf-8' }
        ).toString();
        config = config.replace(`"name": "pyi",`, `"name": "${project}",`);
        writeFileSync(join(join(process.cwd(), project), 'package.json'), config, { encoding: 'utf-8' });
        console.log(green('create project files success ...'));
        console.log(green('use: '));
        console.log(yellow(`    cd ${project} && npm i`));
    } else {
        console.log(red('input project name ...'));
    }
}).command('run', 'run appliaction ...', () => {
    fork(
        join(__dirname, 'run.js'),
        process.argv.slice(3, process.argv.length), {
        stdio: 'inherit'
    });
});

args.parse(process.argv);
