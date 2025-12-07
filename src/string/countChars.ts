/**
 * 统计字符串中每个字符出现的次数
 * @param str
 * @returns
 */
export function countChars(str: string): Record<string, number> {
	const countMap: Record<string, number> = {};

	for (const char of str) {
		countMap[char] = (countMap[char] || 0) + 1;
	}

	return countMap;
}
