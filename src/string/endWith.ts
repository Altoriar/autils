/**
 * endsWith：判断字符串是否以指定值结尾
 * @param str
 * @param prefix
 * @returns
 */
export function endWith(str: string, prefix: string): boolean {
	const strPrefix = str.slice(str.length - prefix.length);
	return strPrefix === prefix;
}
