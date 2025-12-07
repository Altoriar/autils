/**
 * 将arr中没有的元素，合并到arr中
 * @param arr
 * @param arrs
 * @returns
 */
export function merge<T>(arr: T[], ...arrs: T[][]) {
	const result = [...arr];

	arrs?.forEach((arr) => {
		arr.forEach((item) => {
			if (!result.includes(item)) {
				result.push(item);
			}
		});
	});

	return result;
}
