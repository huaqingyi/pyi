import { PYIComponent } from 'pyi';
import { Comp } from './comp';
import { Comp1 } from './comp1';
export declare class Nest extends PYIComponent<any> {
    comp: Comp;
    comp1: Comp1;
    merge(): string[];
}
