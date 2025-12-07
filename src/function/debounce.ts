export function debounce(cb: Function, delay: number) {
	let timerId: ReturnType<typeof setTimeout> | null = null;

	return function (this: any, ...args: any[]) {
		if (timerId) {
			clearTimeout(timerId);
		}
		timerId = setTimeout(() => {
			cb.apply(this, args);
			timerId = null;
		}, delay);
	};
}

export function firstDebounce(cb: Function, delay: number) {
	let timerId: ReturnType<typeof setTimeout> | null = null;
	let isCooldown = false;

	return function (this: any, ...args: any[]) {
		if (!isCooldown) {
			cb.apply(this, args);
			isCooldown = true;

			timerId = setTimeout(() => {
				isCooldown = false;
				cb.apply(this, args);
				timerId = null;
			}, delay);
		}
	};
}
