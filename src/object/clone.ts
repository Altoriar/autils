/**
 * 浅克隆
 * @param target
 * @returns
 */
export function clone<T>(target: T): T | T[] {
	if (Array.isArray(target)) {
		return Array.from(target);
	} else if (target !== null && typeof target === 'object') {
		return Object.assign({}, target);
	} else {
		return target;
	}
}
