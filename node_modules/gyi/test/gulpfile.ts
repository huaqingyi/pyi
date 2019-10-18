import { GFile, Task } from 'gyi';

@GFile
export class GulpFile {

    @Task()
    public async test() {
        console.log('test');
    }

    @Task({
        series: ['test']
    })
    public async build() {
        console.log('build');
    }

}