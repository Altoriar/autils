export function bind(fn: Function, context: any, ...args: any[]) {
	return function (...innerArgs: any[]) {
		if (!context) {
			context = window;
		}

		context.fn = fn;
		const result = context.fn([...args, ...innerArgs]);
		delete context.fn;
		return result;
	};
}
