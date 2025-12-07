export function isEmpty<T>(value: T): boolean {
	return (
		value === undefined ||
		value === null ||
		value === '' ||
		JSON.stringify(value) === '{}' ||
		JSON.stringify(value) === '[]'
	);
}
