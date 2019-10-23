"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const class_validator_1 = require("class-validator");
const execption_1 = require("./execption");
function Validation(target) {
    // const { _root } = target;
    // if (_root && isFunction(_root) && _root() === PYIValidation) {
    // }
    return target;
}
exports.Validation = Validation;
class PYIValidation extends core_1.PYICore {
    static _root() {
        return PYIValidation;
    }
    async validate() {
        return await class_validator_1.validate(this);
    }
    throws(errors) {
        return execption_1.PYIExecption(class {
            async throws() {
                this.errno = 1007;
                this.errmsg = JSON.stringify(errors, null, 4);
                throw new Error(JSON.stringify(errors));
            }
        });
    }
}
exports.PYIValidation = PYIValidation;

//# sourceMappingURL=../sourcemaps/decorators/validation.js.map
