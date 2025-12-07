/**
 * 生成数字范围数组（如 range(1, 5) → [1,2,3,4]，支持步长）
 * @param min
 * @param max
 * @param step
 * @returns
 */
export function range(min: number, max: number, step = 1) {
	const reuslt: number[] = [];
	for (let i = min; i < max; i += step) {
		reuslt.push(i);
	}
	return reuslt;
}
