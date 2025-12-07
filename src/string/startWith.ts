/**
 * 判断字符串是否以指定值开头（封装原生，兼容低版本）
 * @param str
 * @param prefix
 * @returns
 */
export function startWith(str: string, prefix: string): boolean {
	const strPrefix = str.slice(0, prefix.length);
	return strPrefix === prefix;
}
