/**
 * 判断对象是否包含指定属性
 * @example TODO:（支持嵌套属性，如 has(obj, 'a.b.c')）兼容数组取值a.b[0]
 * @param target
 * @param path
 * @returns
 */

export function has<T>(target: T, path: string): boolean {
	if (path === '') return false;

	const keys = path
		.replace(/\[(d+)\]/, '.$1')
		.split('.')
		.filter(Boolean);

	let result: any = target;

	keys.forEach((key) => {
		result = result[key];
	});

	return !!result;
}
