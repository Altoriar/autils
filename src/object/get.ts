/**
 * 获取对象的嵌套属性（避免 obj.a.b.c 报错，支持默认值，如 get(obj, 'a.b.c', 'default')）
 * @param target
 * @param path
 * @param defultValue
 * @returns
 */

export function get<T, U>(
	target: T,
	path?: string,
	defultValue?: U
): T | U | undefined {
	if (path === '') return target;

	const keys = path
		?.replace(/\[(\d+)\]/, '.$1')
		?.split('.')
		?.filter(Boolean);

	let result: any = target;

	keys?.forEach((key) => {
		result = result[key];
	});

	return result || defultValue;
}
