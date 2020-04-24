#!/usr/bin/env node
/// <reference types="node" />
export declare class TestCommand {
    created(path: string): Promise<void | import("child_process").ChildProcess>;
    start(path?: string): Promise<void>;
}
