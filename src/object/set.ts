export function set<T, U>(target: T, path: string, value: U): T {
	const keys = path
		.replace(/\[(d+)]/g, '.$1')
		.split('.')
		.filter(Boolean);

	let reuslt: any = target;
	let isLastIndex = keys.length - 1;

	for (let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const isLastKey = isLastIndex === i;

		if (!isLastKey && !(key in reuslt)) {
			reuslt[key] = /^\d+$/.test(key) ? [] : {};
		}

		if (isLastKey) {
			reuslt[key] = value;
		} else {
			reuslt = reuslt[key];
		}
	}

	return reuslt;
}
