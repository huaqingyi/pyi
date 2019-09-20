"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("ts-node/register");
const lodash_1 = require("lodash");
(async () => {
    console.log(process.argv);
    const jspacks = await Promise.resolve().then(() => __importStar(require(process.argv[2])));
    const [JSApplication] = lodash_1.filter(jspacks, (comp) => comp.isApplication || false);
    const jsapp = new JSApplication();
    jsapp.runtime(({ starter }) => {
        starter();
    });
})();

//# sourceMappingURL=../sourcemaps/cli/starter.js.map
