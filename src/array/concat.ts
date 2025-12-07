/**
 * 拼接数组 / 值
 * @example（增强原生 concat，支持多参数、非数组值拼接）
 * @param target
 * @param args
 */

export function concat<T>(target: T[], ...args: any[]) {
	const result = [...target];
	args.forEach((arg) => {
		if (Array.isArray(arg)) {
			result.push(...arg);
		} else {
			result.push(arg);
		}
	});

	return result;
}
