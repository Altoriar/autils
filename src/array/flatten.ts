/**
 * 数组扁平化
 * @param arr
 * @param depth
 * @returns
 */
export function flatten<T>(arr: T[], depth = Infinity): T[] {
	return arr.reduce<T[]>((pre, next) => {
		if (Array.isArray(next)) {
			pre.push(...flatten(next));
		} else {
			pre.push(next);
		}

		return pre;
	}, []);
}
