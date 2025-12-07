export function throttle(cb: Function, delay: number) {
	let pre = 0;

	return function (this: any, ...arg: any[]) {
		const now = Date.now();
		if (now - pre > delay) {
			cb.apply(this, arg);
			pre = now;
		}
	};
}
