/**
 * 生成指定范围的随机数（如 random(1, 10) → 5）
 * @param min
 * @param max
 * @returns
 */
export function random(min: number, max: number): number {
	let temp = 0;
	if (min > max) {
		temp = min;
		min = max;
		max = temp;
	}
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
