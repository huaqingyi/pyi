"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Obser {
    constructor() {
        // tslint:disable-next-line:no-empty
        this.callback = () => { };
    }
    next(...props) {
        // tslint:disable-next-line:no-unused-expression
        this.callback && this.callback(...props);
    }
    subscribe(callback) {
        this.callback = callback;
    }
}
exports.Obser = Obser;

//# sourceMappingURL=../sourcemaps/libs/obser.js.map
