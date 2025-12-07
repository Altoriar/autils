export function get<T, U>(target: T, path?: string, defaultValue?: U) {
	if (path) {
		return target;
	}
	const keys = path?.split('.');
	let result = target;

	keys?.forEach((k) => {
		result = result[k];
	});

	return result || defaultValue;
}
