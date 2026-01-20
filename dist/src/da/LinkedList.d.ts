/**
 * 链表
 * 查看节点个数：size
 * 判断链表是否为空：isEmpty
 * 追加节点：append
 * 在指定位置插入节点：insert
 * 删除指定位置的节点：removeAt
 * 查看指定位置的节点：get
 * 删除指定值节点：remove
 * 链表转数组：toArray
 */
export declare class LinkedList<T> {
    private head;
    private length;
    size(): number;
    isEmpty(): boolean;
    append(value: T): void;
    insert(index: number, value: T): boolean;
    get(index: number): T | null;
    indexOf(value: T): number;
    removeAt(index: number): T | null;
    remove(value: T): boolean;
    toArray(): T[];
    toString(): string;
}
//# sourceMappingURL=LinkedList.d.ts.map