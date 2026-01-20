type Status = 'pending' | 'resolved' | 'rejected';
export declare class MyPromise<T> {
    status: Status;
    data: T | undefined;
    callbacks: {
        onResolved: Function;
        onRejected: Function;
    }[];
    constructor(excutor: Function);
    then(onResolved?: Function, onRejected?: Function): Promise<unknown>;
    catch(onRejected: Function): void;
    static resolve(value: any): Promise<unknown>;
    static reject(reason: any): Promise<unknown>;
    static all(promises: Promise<unknown>[]): Promise<unknown>;
    static race(promises: Promise<any>[]): Promise<unknown>;
}
export {};
//# sourceMappingURL=index.d.ts.map