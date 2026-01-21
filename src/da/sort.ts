function swap<T>(arr: T[], a: number, b: number) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

/**
 * 冒泡排序 O(n^2)
 * @param target
 * @returns
 */
export const bubbleSort = (target: number[]): number[] => {
	const result = target.slice();

	for (let i = 0; i < result?.length - 1; i++) {
		for (let j = 0; j < result?.length - 1 - i; j++) {
			if (result[j] > result[j + 1]) {
				swap(result, j, j + 1);
			}
		}
	}

	return result;
};

/**
 * 计数排序 O(n + 1)
 * @param target
 * @returns
 */
export const countingSort = (target: number[]): number[] => {
	const result: number[] = [];
	const max = Math.max(...target);
	const counts = new Array(max + 1).fill(0);

	for (const item of target) {
		counts[item]++;
	}

	for (let i = 0; i < max; i++) {
		while (counts[i] > 0) {
			result.push(i);
			counts[i]--;
		}
	}

	return result;
};
