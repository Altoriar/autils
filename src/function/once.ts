/**
 * 函数只执行一次（如初始化函数，多次调用仅首次生效）
 * @param fn
 * @returns
 */

export function once(fn: Function) {
	let called = false;
	return function (...args: any) {
		if (called) return;
		called = true;
		fn(...args);
	};
}
