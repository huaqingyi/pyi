#!/usr/bin / env node
/// <reference types="node" />
export declare class TestCommand {
    private tsconfigPath?;
    created(path: string): Promise<void | import("child_process").ChildProcess>;
    start(application: string): Promise<void>;
}
