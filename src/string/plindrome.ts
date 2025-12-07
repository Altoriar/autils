import { reverseStr } from './reverseStr';

/**
 * 判断字符串是否是回文
 * @example abcdcba
 * @param str
 * @returns
 */
export function plindrome(str: string): boolean {
	return str === reverseStr(str);
}
