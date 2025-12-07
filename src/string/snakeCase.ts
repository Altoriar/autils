/**
 * 字符串转下划线
 * @example（如 snakeCase('helloWorld') → 'hello_world'）
 * @param str
 * @returns
 */
export function snakeCase(str: string): string {
	return str
		.replace(/(a-z0-9)(A-Z)/g, '$1_$2')
		.replace(/[^a-z0-9A-Z]/g, '_')
		.toLowerCase()
		.replace(/_+/g, '_')
		.replace(/^_+|_+$/g, '');
}
