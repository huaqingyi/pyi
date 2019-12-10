import { PYICoreClass, PYICore } from '../core';

export function PYIExecption<Props extends PYICoreClass<PYIThrows<any>>>(execption: Props) {
    // ...
}

export class PYIThrows<Props> extends PYICore {
    // tslint:disable-next-line:no-empty
    public throws(this: Props) { }
}
