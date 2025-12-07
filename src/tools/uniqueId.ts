const idGenerator = (function* createId() {
	let id = 0;
	while (true) {
		yield id++;
	}
})();

export function uniqueId(prefix: string): string {
	const { value: id } = idGenerator.next();
	return `${prefix}_${id}`;
}
