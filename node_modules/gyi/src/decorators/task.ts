import Undertaker from 'undertaker';
import { TaskCore, TaskOption } from '../core/task.core';

export function Task(option?: TaskOption) {
    return function (target: any, key: string) {
        const { name } = target.constructor;
        const inject = Reflect.getMetadata("design:paramtypes", target, key);
        (new TaskCore).injectTask(name, key, {
            inject, option
        });
    }
}