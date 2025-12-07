/**
 * 字符串转连字符（如 kebabCase('helloWorld') → 'hello-world'
 * @param str
 * @returns
 */
export function kebabCase(str: string): string {
	return (
		str
			// 步骤1：处理驼峰/帕斯卡命名（大写字母前加连字符）
			// 如 helloWorld → hello-World，HelloWorld → -Hello-World
			.replace(/(a-z0-9)(A-Z)/g, '$1-$2')
			// 步骤2：将所有非字母数字的字符（空格、下划线、等）替换为连字符
			.replace(/[^a-zA-Z0-9]/g, '-')
			// 步骤3：转为全小写
			.toLowerCase()
			// 步骤4：合并连续的连字符（如 hello--world → hello-world）
			.replace(/-+/g, '-')
			// 步骤5：移除首尾的连字符（如 -hello-world- → hello-world）
			.replace(/^-+|-+$/g, '')
	);
}
