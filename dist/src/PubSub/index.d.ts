declare class PubSub {
    channels: Record<string, Function[]>;
    on(key: string, callback: Function): void;
    emit(key: string, ...args: any[]): void;
    off(key: string): void;
    clear(): void;
}
export declare const pubsub: PubSub;
export {};
//# sourceMappingURL=index.d.ts.map