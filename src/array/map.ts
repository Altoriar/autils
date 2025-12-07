export function map<T>(
	target: T[],
	cb: (item: T, index: number, array: T[]) => T
): T[] {
	const reuslt: T[] = [];

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		reuslt.push(cb(item, i, target));
	}

	return reuslt;
}
