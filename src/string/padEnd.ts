/**
 * padEnd：字符串结尾补全
 * @param str
 * @param strLength
 * @param padStr
 * @returns
 */
export function padEnd(str: string, strLength: number, padStr = ' '): string {
	const padLength = strLength - str.length;
	if (padLength <= 0) {
		return str;
	}

	return str + padStr.repeat(padLength);
}
