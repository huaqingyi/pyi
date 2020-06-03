"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dto = exports.PYIDto = void 0;
const core_1 = require("../core");
class PYIDto extends core_1.PYICore {
    static _base() {
        return PYIDto;
    }
    input() {
        return this;
    }
    output() {
        return this;
    }
}
exports.PYIDto = PYIDto;
function Dto(target) {
    return target;
}
exports.Dto = Dto;

//# sourceMappingURL=../sourcemaps/decorators/dto.js.map
