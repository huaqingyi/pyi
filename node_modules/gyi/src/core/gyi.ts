export class GYI {
    private static _this: GYI;
    protected static store: any;

    protected get store(): any {
        return GYI.store;
    }

    protected set store(value: any) {
        GYI.store = value;
    }

    public static runtime() {
        if (!GYI._this) {
            GYI._this = new GYI;
            GYI.store = {};
        };
        return GYI;
    }
}