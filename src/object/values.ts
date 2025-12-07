/**
 * 获取对象的自有可枚举属性值（封装 Object.values）
 * @param target
 * @returns
 */
export function values<T>(target: T): any[] {
	const reuslt = [];

	for (const key in target) {
		reuslt.push(target[key]);
	}
	return reuslt;
}
