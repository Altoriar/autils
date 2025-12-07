/**
 * 获取对象的自有可枚举属性名（封装 Object.keys）
 * @param target
 * @returns
 */
export function keys<T>(target: T): string[] {
	const reuslt: string[] = [];

	for (const key in target) {
		reuslt.push(key);
	}

	return reuslt;
}
