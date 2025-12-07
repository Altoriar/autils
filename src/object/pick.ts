/**
 * 提取指定的对象属性（返回新对象，
 * @example 如 pick(obj, ['a', 'b'])
 * @param target
 * @param keys
 * @returns
 */
export function pick<T extends object>(target: T, keys: (keyof T)[]): T {
	const result = {} as T;

	for (const key of keys) {
		if (key in target) {
			result[key] = target[key];
		}
	}

	return result;
}
