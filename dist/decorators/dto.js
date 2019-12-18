"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const colors_1 = require("colors");
function Dto(props) {
    if (props._base && props._base() === PYIDto) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.Dto = Dto;
class PYIDto extends core_1.PYICore {
    static _base() {
        return PYIDto;
    }
    throws(errors) {
        console.log(colors_1.red(JSON.stringify(errors)));
    }
}
exports.PYIDto = PYIDto;

//# sourceMappingURL=../sourcemaps/decorators/dto.js.map
