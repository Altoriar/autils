/**
 * 将数组拆分为指定长度的二维数组
 * @example（如 chunk([1,2,3,4], 2) → [[1,2],[3,4]]）
 * @param target
 * @param size
 * @returns
 */
export function chunk<T>(target: T[], size: number): T[][] {
	const result: T[][] = [];

	for (let i = 0; i < target.length; i += size) {
		result.push(target.slice(i, i + size));
	}

	return result;
}
