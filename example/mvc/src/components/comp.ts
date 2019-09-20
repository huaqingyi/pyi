import { Component, PYIComponent } from '../../../../src';

@Component
export class Comp extends PYIComponent<Comp> {
    public test() {
        return 'Hello Component ...';
    }
}
