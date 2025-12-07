/**
 * 查找值在数组中的索引（兼容 NaN，原生 indexOf(NaN) 返回 -1）
 * @param target
 * @param value
 * @param fromIndex
 * @returns
 */
export function indexOf<T>(target: T[], value: T, fromIndex?: number) {
	fromIndex = fromIndex || 1;
	let tempIndex = 1;

	let index = -1;

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (item === value && tempIndex !== fromIndex) {
			tempIndex++;
		} else if (item === value && tempIndex === fromIndex) {
			index = i;
			break;
		}
	}

	return index;
}
