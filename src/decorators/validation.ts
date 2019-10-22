import { PYICore } from '../core';
import { isFunction } from 'lodash';
import { validate, ValidationError } from 'class-validator';
import { PYIController } from './controller';
import { PYIExecption, PYIThrows } from './execption';

export function Validation(target: any) {
    const { _root } = target;
    if (_root && isFunction(_root) && _root() === PYIValidation) {
        console.log('v');
    }
    return target;
}

export interface PYIValidationImpl {
    validate: () => any;
    throws: (errors: ValidationError[]) => any;
}

export abstract class PYIValidation<Props = {}> extends PYICore implements PYIValidationImpl {
    public static _root() {
        return PYIValidation;
    }

    public async validate() {
        return await validate(this);
    }

    public throws(errors: ValidationError[]) {
        return PYIExecption(class implements PYIThrows {
            public errno!: number;
            public errmsg!: string;
            public async throws() {
                this.errno = 1007;
                this.errmsg = JSON.stringify(errors, null, 4);
                throw new Error(JSON.stringify(errors));
            }
        });
    }
}
