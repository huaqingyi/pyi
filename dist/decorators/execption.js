"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function PYIExecption(execption) {
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
exports.PYIExecption = PYIExecption;
class PYIThrows extends core_1.PYICore {
    static _base() {
        return PYIThrows;
    }
    // tslint:disable-next-line:no-empty
    throws() { }
}
exports.PYIThrows = PYIThrows;

//# sourceMappingURL=../sourcemaps/decorators/execption.js.map
