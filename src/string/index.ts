/**
 * 反转字符串
 * @param str 字符串 abc -> cba
 * @returns
 */
export function reverseStr(str: string): string {
	return str.split('').reverse().join('');
}

/**
 * 判断字符串是否是回文 abcdcba
 * @param str
 * @returns
 */
export function palindrome(str: string): boolean {
	return str === reverseStr(str);
}

/**
 * 字符串截取，超出部分显示成...
 * @param str
 * @param len
 * @returns
 */
export function truncate(str: string, len = 10): string {
	return str.length > len ? str.slice(0, len) + '...' : str;
}

/**
 * 首字母大写 word -> Word
 * @param str
 * @returns
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * 句子首字母大写 hello word -> Hello Word
 * @param str
 * @returns
 */
export function capitalizeWords(str: string): string {
	return str.split(' ').map(capitalize).join(' ');
}

/**
 * 统计字符串每个字符出现的次数
 * @param str
 * @returns
 */
export function countChars(str: string): Record<string, number> {
	const result: Record<string, number> = {};

	for (const char of str) {
		result[char] = (result[char] || 0) + 1;
	}

	return result;
}

/**
 * 统计字符串中出现最多的单词
 * @param str
 * @returns
 */
export function maxCountChars(str: string): { char: string; count: number } {
	const result: Record<string, number> = {};
	for (const char of str) {
		result[char] = (result[char] || 0) + 1;
	}

	let maxChar = '';
	let maxCount = 0;

	for (const [char, count] of Object.entries(result)) {
		if (count > maxCount) {
			maxChar = char;
			maxCount = count;
		}
	}

	return { char: maxChar, count: maxCount };
}

/**
 *  横线转驼峰命名
 * @param str
 * @returns
 */
export function kebabToCamel(str: string): string {
	return str
		.split('-')
		.map((word, index) => (index === 0 ? word : capitalize(word)))
		.join('');
}

/**
 * 驼峰转横线命名
 * @param str
 * @returns
 */
export function camelToKebab(str: string): string {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 判断两个字符串是否是字母同异位
 * @param str1
 * @param str2
 * @returns
 */
export function isAnagram(str1: string, str2: string): boolean {
	return str1.split('').sort().join('') === str2.split('').sort().join('');
}

export function parseUrlParams(url: string): Record<string, string> {
	const paramsStr = url.split('?')[1];
	if (!paramsStr) {
		return {};
	}

	const params: Record<string, string> = {};
	paramsStr.split('&').forEach((param) => {
		const [key, value] = param.split('=');
		params[key] = value;
	});

	return params;
}
