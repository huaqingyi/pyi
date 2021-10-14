import { join } from 'path';
import {
    GFile, Core, Task, TSC, IDoneFunction,
    write, createProject,
} from 'gyi';

@GFile
export class GulpFile extends Core {

    @Task({ description: '编译任务 .' })
    public async build(tsc: TSC) {
        console.log('build ...');
        return await tsc.src([
            join(__dirname, 'src/**/*.ts'),
        ]).config({
            sourcemaps: write('./.sourcemaps'),
            typescript: createProject(join(__dirname, 'tsconfig.json')),
            declaration: true,
        }).dest(join(__dirname, 'dist')).run();
    }
}
