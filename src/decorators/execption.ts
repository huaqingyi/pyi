import { PYIDto } from './dto';
import { isFunction, map } from 'lodash';

export function PYIExecption<UseParentClass = any, UsePYIDto = PYIDto>(this: any,
    exp: UseParentClass & any, Vo?: UsePYIDto & any
): any {
    return (NVo?: UsePYIDto & any) => {
        if (
            NVo && NVo._root &&
            isFunction(NVo._root) && NVo._root() === PYIDto
        ) { Vo = NVo; }
        exp.bind(this);
        const execption = new exp();
        const body: Promise<any> = execption.throws();
        if (Vo) {
            return body.then((resp) => {
                return {
                    ...new Vo(resp),
                    ...execption
                };
            }).catch((err) => {
                return {
                    ...(new Vo()).throws(err),
                    ...execption
                };
            });
        } else {
            return body;
        }
    };
}

export interface PYIThrows {
    throws: (this: any) => any;
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
