export function newInstance(Fn: Function, ...args: any[]) {
	const obj = {};
	const result = Fn.apply(obj, args);

	if (result instanceof Object) {
		return result;
	}

	Object.setPrototypeOf(obj, Fn.prototype);

	return obj;
}
