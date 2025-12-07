/**
 * 字符串截取，超出部分显示成...
 * @param str
 * @param limit
 * @returns
 */
export function truncate(str: string, limit: number): string {
	return str.length > limit ? str.slice(0, limit) + '...' : str;
}
