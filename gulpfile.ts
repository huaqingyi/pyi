import { GFile, Task, TSC } from 'gyi';
import { join } from 'path';

@GFile
export class GulpFile {

    @Task({
        src: join(__dirname, 'src/**/*.ts'),
        dest: join(__dirname, 'app')
    })
    public async build(tsc: TSC) {
        await tsc.runtime(join(__dirname, 'src/**/*.ts'), join(__dirname, 'app'));
    }
}
