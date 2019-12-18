// import { createProgram, ModuleKind, ScriptTarget } from 'typescript';
// import { join } from 'path';

// const program = createProgram([join(__dirname, '../src/index.ts')], {
//     module: ModuleKind.CommonJS,
//     target: ScriptTarget.ESNext,
//     sourceMap: true,
//     noImplicitAny: true,
//     removeComments: true,
//     preserveConstEnums: true,
//     suppressImplicitAnyIndexErrors: true,
//     declaration: true,
//     outDir: join(__dirname, '../testbuild')
// });
// const output = program.emit();
// import {
//     sys, findConfigFile, createSemanticDiagnosticsBuilderProgram,
//     createWatchCompilerHost, createWatchProgram, flattenDiagnosticMessageText,
//     formatDiagnostic,
//     ModuleKind,
//     ScriptTarget
// } from 'typescript';
// import { join } from 'path';

// const formatHost = {
//     getCanonicalFileName: (path: any) => path,
//     getCurrentDirectory: sys.getCurrentDirectory,
//     getNewLine: () => sys.newLine,
// };

// function watchMain() {
//     const configPath = findConfigFile(/*searchPath*/ './', sys.fileExists, 'tsconfig.json');
//     if (!configPath) {
//         throw new Error("Could not find a valid 'tsconfig.json'.");
//     }

//     const createProgram = createSemanticDiagnosticsBuilderProgram;

//     const host = createWatchCompilerHost(
//         [join(__dirname, 'index.ts')],
//         {
//             module: ModuleKind.CommonJS,
//             target: ScriptTarget.ESNext,
//             sourceMap: true,
//             noImplicitAny: true,
//             removeComments: true,
//             preserveConstEnums: true,
//             suppressImplicitAnyIndexErrors: true
//         },
//         sys,
//         createProgram,
//         reportDiagnostic,
//         reportWatchStatusChanged
//     );

//     createWatchProgram(host);
// }

// function reportDiagnostic(diagnostic: any) {
//     console.error(
//         'Error',
//         diagnostic.code,
//         ':',
//         flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine())
//     );
// }

// function reportWatchStatusChanged(diagnostic: any) {
//     let message = formatDiagnostic(diagnostic, formatHost);
//     if (message.indexOf('TS6194') > 0) {
//         message = message.replace(/message\sTS[0-9]{4}:(.+)(\s+)$/, '$1');
//         console.log({ message, badge: true });
//     }
// }

// watchMain();
import Koa from 'koa';

export class Test extends Koa {

}

console.log(new Test());
