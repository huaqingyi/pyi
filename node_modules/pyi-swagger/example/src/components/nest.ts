import { Component, PYIComponent, autowired } from 'pyi';
import { Comp } from './comp';
import { Comp1 } from './comp1';

@Component
export class Nest extends PYIComponent<any> {
    @autowired
    public comp!: Comp;

    @autowired
    public comp1!: Comp1;

    public merge() {
        return [
            this.comp.test(),
            this.comp1.test()
        ];
    }
}
