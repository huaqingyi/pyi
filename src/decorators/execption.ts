import { PYIDto } from './dto';
import { isFunction } from 'lodash';

export function PYIExecption<UseParentClass = any, UsePYIDto = PYIDto>(this: any,
    execption: UseParentClass & any, Vo?: UsePYIDto & any
): any {
    return (NVo?: UsePYIDto & any) => {
        if (
            NVo && NVo._root &&
            isFunction(NVo._root) && NVo._root() === PYIDto
        ) { Vo = NVo; }
        execption.bind(this);
        const exinstance = new execption();
        const ex: Promise<any> = exinstance.throws();
        if (Vo) {
            return ex.then((resp) => {
                this.ctx = new Vo(resp);
                return this.ctx;
            }).catch((err) => {
                const { errno, errmsg } = exinstance;
                this.ctx = (new Vo()).throws(err, errno, errmsg);
                return this.ctx;
            });
        } else {
            return ex;
        }
    };
}

export interface PYIThrows {
    throws: (...args: any) => Promise<any>;
}

export function throws(target: any, key: string): any {
    const Dto = Reflect.getMetadata('design:returntype', target, key);
    const merge = target.constructor.prototype[key];
    target.constructor.prototype[key] = async function(...props: any) {
        const execption = await merge.bind(this)(...props);
        if (isFunction(execption)) {
            return await execption.apply(this, [Dto]);
        }
        return await execption;
    };
    return target.constructor.prototype[key];
}
