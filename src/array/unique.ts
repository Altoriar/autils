/**
 * 数组去重（基础版：基于 Set；TODO: 进阶版：支持对象数组按字段去重）
 * @param arr
 * @returns
 */
export function unique<T>(arr: T[]): T[] {
	return Array.from(new Set(arr));
}
