/**
 * 统计字符串汇总出现最多的字符和次数
 * @param str
 * @returns
 */
export function maxCountChar(str: string): { char: string; count: number } {
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
