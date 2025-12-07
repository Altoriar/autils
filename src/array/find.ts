/**
 * 查找数组中第一个满足条件的元素（原生 Array.find 封装，兼容低版本）
 * @param target
 * @param cb
 * @returns
 */
export function find<T>(
	target: T[],
	cb: (item: T, index: number, array: T[]) => boolean | undefined
) {
	let result: T | undefined = undefined;

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (cb(item, i, target)) {
			result = item;
			break;
		}
	}

	return result;
}

/**
 * 查找数组中第一个满足条件的元素索引
 * @param target
 * @param cb
 * @returns
 */
export function findIndex<T>(
	target: T[],
	cb: (item: T, index: number, array: T[]) => boolean | undefined
) {
	let index = 0;
	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (cb(item, i, target)) {
			index = i;
			break;
		}
	}
	return index;
}
