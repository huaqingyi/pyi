import { TaskCore } from "../core/task.core";

export function GFile(target: any, key?: string) {
    (new TaskCore).makeTask(target);
}