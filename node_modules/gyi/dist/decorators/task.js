"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_core_1 = require("../core/task.core");
function Task(option) {
    return function (target, key) {
        var name = target.constructor.name;
        var inject = Reflect.getMetadata("design:paramtypes", target, key);
        (new task_core_1.TaskCore).injectTask(name, key, {
            inject: inject, option: option
        });
    };
}
exports.Task = Task;

//# sourceMappingURL=../sourcemaps/decorators/task.js.map
