#!/usr/bin/env node

import { fork } from 'child_process';
import { join } from 'path';
import args from 'args';
import { prompt } from 'inquirer';
import fuzzy from 'fuzzy';
import { random } from 'lodash';

const states = [
    'Application',
    'Component'
];

args.command('create', 'create new project ...', async (name, sub, options) => {
    const answers = await prompt([
        {
            type: 'autocomplete',
            name: 'type',
            message: '请问需要什么模版类型?',
            source: (_answers: any, input: any) => {
                input = input || '';
                return new Promise((resolve) => {
                    setTimeout(() => {
                        const fuzzyResult = fuzzy.filter(input, states);
                        resolve(
                            fuzzyResult.map((el: any) => {
                                return el.original;
                            })
                        );
                    }, random(30, 500));
                });
            }
        },
        {
            type: 'input',
            name: 'name',
            message: '请给项目命名(可不填,除非生成包名与库名不同):'
        },
        {
            type: 'input',
            name: 'git',
            message: '请输入git地址:'
        },
        {
            type: 'input',
            name: 'author',
            message: '请输入作者名字:'
        }
    ]);
}).command('run', 'run appliaction ...', (name, sub, options) => {
    fork(
        join(__dirname, 'run.js'),
        process.argv.slice(3, process.argv.length), {
        stdio: 'inherit'
    });
});

args.parse(process.argv);
