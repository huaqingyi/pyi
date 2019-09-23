import { PYIBase } from '../core';
import { isFunction } from 'lodash';

// tslint:disable-next-line:no-empty-interface
export interface PYIExceptionOption {
    throws: <ResponestError>(err: any) => ResponestError;
}

export function Exception(config: PYIExceptionOption) {
    return (target: any, key: string) => {
        if (target._baisc && isFunction(target._baisc) && target._baisc === PYIBase) {
            console.log(1);
        }
    };
}
