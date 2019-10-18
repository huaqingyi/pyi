#!/usr/bin/env node
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var core_1 = require("./core");
core_1.GYI.runtime();
__export(require("./core"));
__export(require("./decorators"));
__export(require("./libs"));

//# sourceMappingURL=sourcemaps/index.js.map
