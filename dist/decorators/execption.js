"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dto_1 = require("./dto");
const lodash_1 = require("lodash");
function PYIExecption(execption, Vo) {
    return (NVo) => {
        if (NVo && NVo._root &&
            lodash_1.isFunction(NVo._root) && NVo._root() === dto_1.PYIDto) {
            Vo = NVo;
        }
        execption.bind(this);
        const exinstance = new execption();
        const ex = exinstance.throws();
        if (Vo) {
            return ex.then((resp) => {
                this.ctx = new Vo(resp);
                return this.ctx;
            }).catch((err) => {
                const { errno, errmsg } = exinstance;
                this.ctx = (new Vo()).throws(err, errno, errmsg);
                return this.ctx;
            });
        }
        else {
            return ex;
        }
    };
}
exports.PYIExecption = PYIExecption;
function throws(target, key) {
    const Dto = Reflect.getMetadata('design:returntype', target, key);
    const merge = target.constructor.prototype[key];
    target.constructor.prototype[key] = async function (...props) {
        const execption = await merge.bind(this)(...props);
        if (lodash_1.isFunction(execption)) {
            return await execption.apply(this, [Dto]);
        }
        return await execption;
    };
    return target.constructor.prototype[key];
}
exports.throws = throws;

//# sourceMappingURL=../sourcemaps/decorators/execption.js.map
