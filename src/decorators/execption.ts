import { PYIVo } from './impl';
import { isFunction } from 'lodash';

export function PYIExecption<UseParentClass = any, UsePYIVo = PYIVo>(this: any,
    execption: UseParentClass & any, Vo?: UsePYIVo & any
): any {
    return (NVo?: UsePYIVo & any) => {
        if (
            NVo && NVo._extends &&
            isFunction(NVo._extends) && NVo._extends() === PYIVo
        ) { Vo = NVo; }
        execption.bind(this);
        const exinstance = new execption();
        const ex: Promise<any> = exinstance.throws();
        if (Vo) {
            return ex.then((resp) => {
                return this.ctx = new Vo(resp);
                // return new Vo(resp);
            }).catch((err) => {
                const { errno, errmsg } = exinstance;
                return this.ctx = (new Vo()).throws(err, errno, errmsg);
                // return (new Vo()).throws(err, errno, errmsg);
            });
        } else {
            return ex;
        }
    };
}

export interface PYIThrows {
    errno?: number;
    errmsg?: string;
    throws: (...args: any) => Promise<any>;
}

export function throws(target: any, key: string): any {
    const Vo = Reflect.getMetadata('design:returntype', target, key);
    const merge = target.constructor.prototype[key];
    target.constructor.prototype[key] = async function(...props: any) {
        const execption = await merge.bind(this)(...props);
        if (isFunction(execption)) {
            return await execption.apply(this, [Vo]);
        }
        return await execption;
    };
    return target.constructor.prototype[key];
}
