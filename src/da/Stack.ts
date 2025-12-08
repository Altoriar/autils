/**
 * 栈
 * 入栈：push
 * 出栈：pop
 * 查看栈顶：peek
 * 返回栈长度：size
 * 判断栈是否为空：isEmpty
 */
export class Stack<T> {
	items: T[] = [];

	constructor() {
		this.items = [];
	}

	// 入栈
	push(item: T) {
		this.items.push(item);
	}

	// 出栈
	pop(): T | undefined {
		return this.items.pop();
	}

	// 查看栈顶
	peek(): T {
		return this.items[this.items.length - 1];
	}

	// 返回栈长度
	size(): number {
		return this.items.length;
	}

	// 判断栈是否为空
	isEmpty(): boolean {
		return this.items.length === 0;
	}

	toString(): string {
		if (this.isEmpty()) return '';

		let reuslt = '';
		for (let i = 0; i < this.items.length; i++) {
			reuslt += `${this.items[i]} -> ${i}，`;
		}
		return reuslt;
	}
}
