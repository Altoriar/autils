export function apply(fn: Function, context: any, args: any[]) {
	if (!context) {
		context = window;
	}

	context.fn = fn;
	const result = context.fn(args);
	delete context.fn;
	return result;
}
