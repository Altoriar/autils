/**
 * 队列
 * 入队: enqueue(item: T): void
 * 出队: dequeue(item: T): T | undefined
 * 查看队头: peek(): T
 * 查看元素个数: size(): number
 * 判断队列是否为空: isEmpty(): boolean
 */
export declare class Queue<T> {
    items: T[];
    constructor();
    enqueue(item: T): void;
    dequeue(): T | undefined;
    peek(): T;
    size(): number;
    isEmpty(): boolean;
    clear(): void;
    toString(): string;
}
//# sourceMappingURL=Queue.d.ts.map