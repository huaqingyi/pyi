import { PYICore } from '../core';
import { ValidationError } from 'class-validator';
export declare function Validation(target: any): any;
export declare function IsNotEmptyIf(target: any & PYIValidation, key: string): any;
export interface PYIValidationImpl {
    validate: () => any;
    throws: (errors: ValidationError[]) => any;
}
export declare abstract class PYIValidation<Props = {}> extends PYICore implements PYIValidationImpl {
    static swaggerDocument: any;
    static _root(): typeof PYIValidation;
    _ignore?: string[];
    validate(): Promise<ValidationError[]>;
    throws(errors: ValidationError[]): any;
}
