/**
 * 深克隆
 * @param target
 * @param map
 * @returns
 */
export function deepClone<T>(target: T | T[], map = new Map()): T | T[] {
	if (
		Array.isArray(target) ||
		(target !== null && typeof target === 'object')
	) {
		let cloneTarget = map.get(target);

		if (cloneTarget) {
			return cloneTarget;
		}

		if (Array.isArray(target)) {
			cloneTarget = [];
			map.set(target, cloneTarget);
			target.forEach((item, index) => {
				cloneTarget[index] = deepClone(item, map);
			});
		} else {
			cloneTarget = {};
			map.set(target, cloneTarget);
			for (let key in target) {
				if (Object.hasOwnProperty.call(target, key)) {
					const value = target[key];
					cloneTarget[key] = deepClone(value, map);
				}
			}
		}
	}
	return target;
}
