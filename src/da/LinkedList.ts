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

class ListNode<T> {
	value: T;
	next: ListNode<T> | null;

	constructor(value: T) {
		this.value = value;
		this.next = null;
	}
}

export class LinkedList<T> {
	private head: ListNode<T> | null = null;
	private length: number = 0;

	size(): number {
		return this.length;
	}

	isEmpty(): boolean {
		return this.length === 0;
	}

	// 追加节点
	append(value: T) {
		const node = new ListNode(value);
		if (!this.head) {
			this.head = node;
		} else {
			let current = this.head;
			while (current.next) {
				current = current.next;
			}
			current.next = node;
		}
		this.length++;
	}

	// 在指定位置插入节点
	insert(index: number, value: T): boolean {
		if (index < 0 || index > this.length) return false;

		const node = new ListNode(value);

		// 头部插入
		if (index === 0) {
			node.next = this.head;
			this.head = node;
		} else {
			let current = this.head;
			let prev: ListNode<T> | null = null;
			let i = 0;

			while (i++ < index) {
				prev = current;
				current = current!.next;
			}

			node.next = current;
			prev!.next = node;
		}

		this.length++;
		return true;
	}

	// 获取指定元素
	get(index: number): T | null {
		if (index < 0 || index > this.length) return null;

		let current = this.head;
		let i = 0;
		while (i++ < index) {
			current = current!.next;
		}

		return current!.value;
	}

	// 查找某一个元素的索引，不存在则返回 -1
	indexOf(value: T): number {
		let current = this.head;
		let index = 0;

		while (current) {
			if (current.value === value) return index;
			current = current.next;
			index++;
		}

		return -1;
	}

	// 删除指定位置的节点
	removeAt(index: number): T | null {
		if (index < 0 || index > this.length) return null;

		let current = this.head;
		let prev: ListNode<T> | null = null;

		// 头部特殊处理
		if (index === 0) {
			this.head = current!.next;
		} else {
			let i = 0;
			while (i++ < index) {
				prev = current;
				current = current!.next;
			}
			prev!.next = current!.next;
		}

		this.length--;
		return current!.value;
	}

	// 删除指定值节点
	remove(value: T): boolean {
		const index = this.indexOf(value);
		if (index === -1) return false;

		return this.removeAt(index) !== null;
	}

	// 链表转数组，方便操作
	toArray(): T[] {
		const result: T[] = [];
		let current = this.head;

		while (current) {
			result.push(current!.value);
			current = current.next;
		}

		return result;
	}

	toString(): string {
		const array = this.toArray();

		let result = '';
		array.forEach((item, index) => {
			result += `${item}${index === array.length - 1 ? '' : ','}`;
		});

		return result;
	}
}
