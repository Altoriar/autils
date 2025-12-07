/**
 * 判断两个字符串是否是字母同异位
 * @param str1
 * @param str2
 * @returns
 */
export function isAnagram(str1: string, str2: string): boolean {
	return str1.split('').sort().join('') === str2.split('').sort().join('');
}
