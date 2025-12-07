/**
 * trim：移除字符串首尾空格（封装原生，兼容低版本）
 * @param str
 * @returns
 */
export function trim(str: string): string {
	// 边界处理：非字符串类型，转为空字符串
	if (typeof str !== 'string') {
		return '';
	}

	// 优先使用原生 trim（现代浏览器/高版本 JS 环境）
	if (typeof String.prototype.trim === 'function') {
		return str.trim();
	}

	// 低版本环境兜底（正则实现，兼容 IE8-）
	// 正则说明：^[\s\uFEFF\xA0]+ 匹配开头的空格/全角空格/零宽空格；[\s\uFEFF\xA0]+$ 匹配结尾的
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
