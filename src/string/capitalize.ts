/**
 * 字符串首字母大写
 * @example hello -> Hello
 * @param str
 * @returns
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
