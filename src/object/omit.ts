/**
 * 移除对象的指定属性, 返回新对象，
 * @example 如 omit(obj, ['a', 'b'])
 * @param target
 * @param keys
 * @returns
 */
export function omit<T extends object>(target: T, keys: (keyof T)[]): T {
	const result: T = { ...target };

	for (const key of keys) {
		if (key in result) {
			delete result[key];
		}
	}

	return result;
}
