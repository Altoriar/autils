import { AnyNaptrRecord } from 'dns';

type Excutor = () => void;

type Status = 'pending' | 'resolved' | 'rejected';

export class MyPromise {
	status: Status = 'pending';
	data: any = undefined;
	callbacks: { onResolved: Function; onRejected: Function }[] = []; // 结构 {onResolved() {}, onRejected() {}}

	constructor(excutor: Function) {
		const self = this;
		self.status = 'pending';
		self.data = undefined;
		self.callbacks = [];

		function resolve(value: AnyNaptrRecord) {
			if (self.status !== 'pending') return;

			self.status = 'resolved';
			self.data = value;
			if (self.callbacks.length > 0) {
				setTimeout(() => {
					self.callbacks.forEach((cb) => {
						cb.onResolved(value);
					});
				});
			}
		}

		function reject(reason: any) {
			if (self.status !== 'pending') return;

			self.status = 'rejected';
			self.data = reason;
			if (self.callbacks.length > 0) {
				setTimeout(() => {
					self.callbacks.forEach((cb) => {
						cb.onRejected(reason);
					});
				});
			}
		}

		try {
			excutor(resolve, reject);
		} catch (error) {
			reject(error);
		}
	}

	then() {}

	catch() {}

	static resolve() {}

	static reject() {}

	// Promise.all([fetch(), fetch()])
	/* Promise函数对象all方法，接收promise数组，只有所有promise对象成功返回成功，否则返回失败 */
	static all(promises: Promise<unknown>[]) {
		let promiseCount = 0;
		const values = new Array(promises.length);

		return new Promise((resolve, reject) => {
			promises.forEach((promise, index) => {
				promise.then(
					(value) => {
						promiseCount++;
						values[index] = value;

						if (promiseCount === promises.length) {
							resolve(values);
						}
					},
					(reason) => {
						reject(reason);
					}
				);
			});
		});
	}

	/* Promise函数对象race方法，其结果由第一个完成的promise结果决定 */
	static race(promises: Promise<any>[]) {
		return new Promise((resovle, reject) => {
			promises.forEach((promise) => {
				promise.then(
					(value) => {
						resovle(value);
					},
					(reason) => {
						reject(reason);
					}
				);
			});
		});
	}
}
