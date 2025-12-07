/**
 * 获取对象的键值对数组（封装 Object.entries）
 * @param target
 * @returns
 */
export function entries<T>(target: T): [string, any][] {
	const reuslt: [string, any][] = [];

	for (const key in target) {
		reuslt.push([key, target[key]]);
	}

	return reuslt;
}
