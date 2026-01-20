/**
 * 数组扁平化
 * @param arr
 * @param depth
 * @returns
 */
export function flatten<T>(arr: T[], depth = Infinity): T[] {
	return arr.reduce<T[]>((pre, next) => {
		if (Array.isArray(next) && depth > 0) {
			pre.push(...flatten(next, depth - 1));
		} else {
			pre.push(next);
		}

		return pre;
	}, []);
}


