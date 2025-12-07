/**
 * 移除数组中的假值
 * @example（false/0/''/null/undefined/NaN)
 * @param target
 * @returns
 */
export function compact<T>(target: T[]): T[] {
	return target.filter((item) => item);
}
