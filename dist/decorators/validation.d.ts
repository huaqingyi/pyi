import { PYICore } from '../core';
import { ValidationError } from 'class-validator';
export declare function Validation(target: any): any;
export interface PYIValidationImpl {
    validate: () => any;
    throws: (errors: ValidationError[]) => any;
}
export declare abstract class PYIValidation<Props = {}> extends PYICore implements PYIValidationImpl {
    static swaggerDocument: any;
    static _root(): typeof PYIValidation;
    validate(): Promise<ValidationError[]>;
    throws(errors: ValidationError[]): any;
}
