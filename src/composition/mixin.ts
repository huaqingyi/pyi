/*
 * @Author: huaqingyi
 * @LastEditors: huaqingyi
 * @Description: zeconding ...
 */

export type AbstractClass = new (...props) => any;

export function mixin(ClA: AbstractClass, ...mixins: AbstractClass[]) {
    const mixinProps = (target, source) => {
        Object.getOwnPropertyNames(source).forEach((prop) => {
            if (/^constructor$/.test(prop)) { return; }
            Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop) as any);
        });
    };
    let Ctor;
    if (ClA && typeof ClA === 'function') {
        Ctor = class extends ClA {
            constructor(...props) {
                super(...props);
            }
        };
        mixins.forEach(source => {
            mixinProps(Ctor.prototype, source.prototype);
        });
    } else {
        Ctor = class { };
    }

    return Ctor;

}