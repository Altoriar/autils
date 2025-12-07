/**
 * padStart：字符串开头补全（封装原生，如 padStart('123', 5, '0') → '00123'）
 * @param str
 * @param strLength
 * @param padStr
 * @returns
 */
export function padStart(str: string, strLength: number, padStr = ' '): string {
	let padLength = strLength - str.length;

	if (padLength <= 0) {
		return str;
	}

	return padStr.repeat(padLength) + str;
}
