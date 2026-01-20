/**
 * 栈
 * 入栈：push
 * 出栈：pop
 * 查看栈顶：peek
 * 返回栈长度：size
 * 判断栈是否为空：isEmpty
 */
export declare class Stack<T> {
    items: T[];
    constructor();
    push(item: T): void;
    pop(): T | undefined;
    peek(): T;
    size(): number;
    isEmpty(): boolean;
    toString(): string;
}
//# sourceMappingURL=Stack.d.ts.map