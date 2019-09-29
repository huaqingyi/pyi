import { Component, PYIComponent } from 'pyi';

@Component
export class Comp1 extends PYIComponent<Comp1> {
    public test() {
        return 'Hello Component1 ...';
    }
}
