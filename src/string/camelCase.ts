/**
 * 字符串转驼峰
 * @example （如 camelCase('hello-world') → 'helloWorld'）
 * @param str
 * @returns
 */
export function camelCase(str: string): string {
	return str
		.split('-')
		.map((word, index) =>
			index === 0 ? word : word?.charAt(0).toUpperCase() + word.slice(1)
		)
		.join('');
}
