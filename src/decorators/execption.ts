import { PYICoreClass, PYICore, PYIApp } from '../core';

export function PYIExecption<Props extends PYICoreClass<PYIThrows<any>>>(execption: Props): any {
    return execption;
    // console.log(this);
    // return Promise.resolve(execption).then((action) => {
    //     console.log(action);
    //     return 'success ...';
    // }).catch((err) => {
    //     console.log(err);
    //     return 'error ...';
    // });
}

export class PYIThrows<Props> extends PYICore {
    public static _base(): PYIApp {
        return PYIThrows;
    }
    
    // tslint:disable-next-line:no-empty
    public throws(this: Props) { }
}
