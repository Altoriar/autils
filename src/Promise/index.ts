type Resolve<T> = (value: T) => void;
type Reject<U> = (reason: U) => void;

type Executor<T, U> = (resolve: Resolve<T>, reject: Reject<U>) => void;

type Status = 'pending' | 'resolved' | 'rejected';

export class MyPromise<T, U> {
	status: Status = 'pending';
	data: T | U | undefined = undefined;
	callbacks: { onResolved: Resolve<T>; onRejected: Reject<U> }[] = []; // 结构 {onResolved() {}, onRejected() {}}

	constructor(executor: Executor<T, U>) {
		this.status = 'pending';
		this.data = undefined;
		this.callbacks = [];

		const resolve = (value: T) => {
			if (this.status !== 'pending') return;

			this.status = 'resolved';
			this.data = value;
			if (this.callbacks.length > 0) {
				setTimeout(() => {
					this.callbacks.forEach((cb) => {
						cb.onResolved(value);
					});
				});
			}
		};

		const reject = (reason: U) => {
			if (this.status !== 'pending') return;

			this.status = 'rejected';
			this.data = reason;
			if (this.callbacks.length > 0) {
				setTimeout(() => {
					this.callbacks.forEach((cb) => {
						cb.onRejected(reason);
					});
				});
			}
		};

		try {
			executor(resolve, reject);
		} catch (error: any) {
			reject(error);
		}
	}

	then(onResolved?: Function, onRejected?: Function) {
		onResolved =
			typeof onResolved === 'function' ? onResolved : (value: T) => value;
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (reason: any) => {
						throw reason;
				  };

		return new Promise((resolve, reject) => {
			const handle = (callback: Function) => {
				// 回调函数抛出异常样
				try {
					const result = callback(this.data);
					// 如果回调函数返回的是 Promise，则改变 Promise 的状态，否则将值返回
					if (result instanceof Promise) {
						result.then(resolve, reject);
					} else {
						resolve(result);
					}
				} catch (error) {
					reject(error);
				}
			};

			if (this.status === 'pending') {
				this.callbacks.push({
					onResolved(value: T) {
						handle(onResolved);
					},
					onRejected(value: T) {
						handle(onRejected);
					},
				});
			} else if (this.status === 'resolved') {
				setTimeout(() => {
					handle(onResolved);
				});
			} else {
				setTimeout(() => {
					handle(onRejected);
				});
			}
		});
	}

	catch(onRejected: Function) {
		this.then(undefined, onRejected);
	}

	static resolve(value: any) {
		return new Promise((resolve, reject) => {
			if (value instanceof Promise) {
				value.then(resolve, reject);
			}
		});
	}

	static reject(reason: any) {
		return new Promise((resolve, reject) => {
			reject(reason);
		});
	}

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
