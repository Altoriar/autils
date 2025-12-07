function swap<T>(arr: T[], a: number, b: number) {
	let temp = arr[a];
	arr[a] = arr[b];
	arr[b] = temp;
}

function partition<T>(arr: T[], left: number, right: number): number {
	let pivot = left;
	let index = pivot + 1;

	for (let i = index; i <= right; i++) {
		if (arr[i] < arr[pivot]) {
			swap(arr, i, index);
			index++;
		}
	}
	swap(arr, pivot, index - 1);
	return index - 1;
}

export function quickSort<T>(arr: T[], left?: number, right?: number) {
	let len = arr.length;
	let partitionIndex = 0;
	left = typeof left !== 'number' ? 0 : left;
	right = typeof right !== 'number' ? 0 : right;

	if (left < right) {
		partitionIndex = partition(arr, left, right);
		quickSort(arr, left, partitionIndex - 1);
		quickSort(arr, partitionIndex + 1, right);
	}
}
