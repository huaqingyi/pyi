import { Context } from 'koa';
import { AppConfigOption } from '../config';
import { PYIVo } from '../decorators';

export abstract class PYIBase {

    public static _pyi() {
        return {};
    }

    public static _baisc() {
        return PYIBase;
    }

    public static Execption<UseParentClass = any, UsePYIVo = PYIVo>(
        execption: UseParentClass & any, Vo?: UsePYIVo & any
    ): any {
        execption.bind(PYIBase._this);
        const exinstance = new execption();
        const ex: Promise<any> = exinstance.throws();
        if (Vo) {
            return ex.then((resp) => {
                return PYIBase._this.ctx = new Vo(resp);
                // return new Vo(resp);
            }).catch((err) => {
                const { errno, errmsg } = exinstance;
                return PYIBase._this.ctx = (new Vo()).throws(err, errno, errmsg);
                // return (new Vo()).throws(err, errno, errmsg);
            });
        } else {
            return ex;
        }
        // return PYIController._this.ctx.vo = vo;
    }

    protected static _this: PYIBase;

    public ctx!: Context;

    constructor() {
        PYIBase._this = this;
    }
}

export interface RuntimeAutoChange {
    readonly _runtime: (config: AppConfigOption) => any;
}
