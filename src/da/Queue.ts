/**
 * 队列
 * 入队: enqueue(item: T): void
 * 出队: dequeue(item: T): T | undefined
 * 查看队头: peek(): T
 * 查看元素个数: size(): number
 * 判断队列是否为空: isEmpty(): boolean
 */

export class Queue<T> {
	items: T[] = [];

	constructor() {
		this.items = [];
	}

	// 添加元素
	enqueue(item: T): void {
		this.items.push(item);
	}

	// 删除元素
	dequeue(): T | undefined {
		const removed = this.items.pop();
		return removed;
	}

	// 查看队头
	peek(): T {
		return this.items[0];
	}

	size(): number {
		return this.items.length;
	}

	isEmpty(): boolean {
		return this.items.length === 0;
	}

	clear(): void {
		this.items = [];
	}

	toString(): string {
		if (this.isEmpty()) {
			return '';
		}

		let str = '';
		this.items.forEach((item, index) => {
			str += `${item} -> ${index}，`;
		});

		return str;
	}
}
