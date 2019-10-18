export class Obser {
    public callback: Function;
    constructor() {
        // tslint:disable-next-line:no-empty
        this.callback = () => { };
    }
    public next(...props: any) {
        // tslint:disable-next-line:no-unused-expression
        this.callback && this.callback(...props);
    }
    public subscribe(callback: Function) {
        this.callback = callback;
    }
}
