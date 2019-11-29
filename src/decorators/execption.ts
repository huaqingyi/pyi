import { isFunction } from 'lodash';
import { PYICore } from '../core';
import { PYIDto } from './dto';

export function PYIExecption<Props>(this: any, trys: PYIThrows<Props>, Vo?: PYICore & any): any {
    console.log(3, this);
    return ((NVo?: PYICore & any) => {
        if (
            NVo && NVo._root &&
            isFunction(NVo._root) && NVo._root() === PYIDto
        ) { Vo = NVo; }
        // tslint:disable-next-line:no-shadowed-variable
        const { throws } = trys;
        console.log(throws);
        const body: Promise<any> = throws.apply(this);
        if (Vo) {
            return body.then((resp) => {
                return new Vo(resp);
            }).catch((err) => {
                return (new Vo()).throws(err);
            });
        } else {
            return body;
        }
    }).bind(this);
}

export interface PYIThrows<Props> {
    throws: (this: Props) => any;
}

export function throws(target: any, key: string): any {
    const Dto = Reflect.getMetadata('design:returntype', target, key);
    const merge = target.constructor.prototype[key];
    target.constructor.prototype[key] = async function (...props: any) {
        const execption = await merge.bind(this)(...props);
        if (isFunction(execption)) {
            return await execption.apply(this, [Dto]);
        }
        return await execption;
    };
    return target.constructor.prototype[key];
}
