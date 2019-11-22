"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
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
function IsNotEmptyIf(target, key) {
    if (!target._ignore) {
        target._ignore = [];
    }
    target._ignore.push(key);
    return target._ignore;
}
exports.IsNotEmptyIf = IsNotEmptyIf;
class PYIValidation extends core_1.PYICore {
    static _root() {
        return PYIValidation;
    }
    async validate() {
        return await class_validator_1.validate(this).then((errors) => {
            // if (!this._ignore) { return errors; }
            // return filter(errors, (error) => {
            //     if ((this._ignore || []).indexOf(error.property) !== -1) {
            //         if (validator.isEmpty(error.value)) {
            //             return false;
            //         }
            //         return true;
            //     }
            //     return true;
            // });
            if (!this._ignore || this._ignore.length === 0) {
                return errors;
            }
            return lodash_1.filter(errors, (err) => {
                if ((this._ignore || []).indexOf(err.property) !== -1 && lodash_1.isEmpty(err.value)) {
                    return false;
                }
                return true;
            });
        });
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
