import { Component, PYIComponent } from 'pyi';

@Component
export class Comp extends PYIComponent<Comp> {
    public test() {
        return 'Hello Component ...';
    }
}
