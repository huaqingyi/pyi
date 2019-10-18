export declare class Obser {
    callback: Function;
    constructor();
    next(...props: any): void;
    subscribe(callback: Function): void;
}
