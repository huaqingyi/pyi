import { filter, isEmpty } from 'lodash';
import { PYICore } from '../core';
import { validate, ValidationError } from 'class-validator';
import { PYIExecption, PYIThrows } from './execption';

export function Validation(target: any) {
    // const { _root } = target;
    // if (_root && isFunction(_root) && _root() === PYIValidation) {
    // }
    return target;
}

export function IsNotEmptyIf(target: any & PYIValidation, key: string) {
    if (!target._ignore) {
        target._ignore = [];
    }
    target._ignore.push(key);
    return target._ignore;
}

export interface PYIValidationImpl {
    validate: () => any;
    throws: (errors: ValidationError[]) => any;
}

export abstract class PYIValidation<Props = {}> extends PYICore implements PYIValidationImpl {
    public static swaggerDocument: any;

    public static _root() {
        return PYIValidation;
    }

    public _ignore?: string[];

    public async validate() {
        return await validate(this).then((errors) => {
            // if (!this._ignore) { return errors; }
            // return filter(errors, (error) => {
            //     if ((this._ignore || []).indexOf(error.property) !== -1) {
            //         if (validator.isEmpty(error.value)) {
            //             return false;
            //         }
            //         return true;
            //     }
            //     return true;
            // });
            if (!this._ignore || this._ignore.length === 0) { return errors; }
            return filter(errors, (err) => {
                if ((this._ignore || []).indexOf(err.property) !== -1 && isEmpty(err.value)) {
                    return false;
                }
                return true;
            });
        });
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
