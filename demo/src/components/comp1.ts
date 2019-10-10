import { Component, PYIComponent } from '../../../src';

@Component
export class Comp1 extends PYIComponent<Comp1> {
    public test() {
        return 'Hello Component1 ...';
    }
}
