type Status = 'pending' | 'resolved' | 'rejected';
export declare class MyPromise {
    status: Status;
    data: any;
    callbacks: {
        onResolved: Function;
        onRejected: Function;
    }[];
    constructor(excutor: Function);
    then(): void;
    catch(): void;
    static resolve(): void;
    static reject(): void;
    static all(promises: Promise<unknown>[]): Promise<unknown>;
    static race(promises: Promise<any>[]): Promise<unknown>;
}
export {};
//# sourceMappingURL=index.d.ts.map