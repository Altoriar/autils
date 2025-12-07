/**
 * 过滤数组（原生封装，统一返回新数组）
 * @param target
 * @param cb
 * @returns
 */
export function filter<T>(
	target: T[],
	cb: (item: T, index: number, array: T[]) => boolean
) {
	const reuslt: T[] = [];

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (cb(item, i, target)) {
			reuslt.push(item);
		}
	}

	return reuslt;
}
