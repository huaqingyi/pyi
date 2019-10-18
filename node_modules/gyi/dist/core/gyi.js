"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GYI = /** @class */ (function () {
    function GYI() {
    }
    Object.defineProperty(GYI.prototype, "store", {
        get: function () {
            return GYI.store;
        },
        set: function (value) {
            GYI.store = value;
        },
        enumerable: true,
        configurable: true
    });
    GYI.runtime = function () {
        if (!GYI._this) {
            GYI._this = new GYI;
            GYI.store = {};
        }
        ;
        return GYI;
    };
    return GYI;
}());
exports.GYI = GYI;

//# sourceMappingURL=../sourcemaps/core/gyi.js.map
