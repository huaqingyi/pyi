"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
function AutoPlugin(props) {
    if (props._base && props._base() === PYIPlugin) {
        return props;
    }
    else {
        return (target) => {
            target.prototype.props = props;
            return target;
        };
    }
}
exports.AutoPlugin = AutoPlugin;
class PYIPlugin extends core_1.PYIPlugins {
    static _base() {
        return PYIPlugin;
    }
}
exports.PYIPlugin = PYIPlugin;

//# sourceMappingURL=../sourcemaps/decorators/plugins.js.map
