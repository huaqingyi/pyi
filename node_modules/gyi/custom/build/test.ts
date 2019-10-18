import { LibsBase } from "../../src";

export class Test extends LibsBase {
    async runtime(): Promise<any> {
        return await console.log('test build tools ...');
    }
}