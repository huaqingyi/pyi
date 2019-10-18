"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const colors_1 = require("colors");
class PYIDto extends core_1.PYICore {
    constructor(data) {
        super();
        this.err = false;
        this.data = data || {};
        this.app.dto = true;
    }
    static _root() {
        return PYIDto;
    }
    async throws(err, errno, errmsg) {
        this.err = true;
        this.errno = errno || 1003;
        if (errmsg) {
            this.errmsg = errmsg;
            console.log(colors_1.yellow(`${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`));
            // console.error(err);
        }
        else {
            this.errmsg = `${err.name}: ${err.message} ${err.stack ? `(${err.stack})` : ''}`;
        }
        this.data = {};
        return this;
    }
}
exports.PYIDto = PYIDto;
// tslint:disable-next-line:max-classes-per-file
class PYIGDto extends PYIDto {
}
exports.PYIGDto = PYIGDto;
function Dto(target, key) {
    // console.log('dto', target);
}
exports.Dto = Dto;

//# sourceMappingURL=../sourcemaps/decorators/dto.js.map
