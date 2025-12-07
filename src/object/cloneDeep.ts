/**
 * 深克隆
 * @param target
 * @param map
 * @returns
 */

export function cloneDeep<T>(target: T, map = new Map()): T | T[] {
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
				cloneTarget[index] = cloneDeep(item, map);
			});
		} else {
			cloneTarget = {};
			map.set(target, cloneTarget);
			for (const key in target) {
				if (Object.hasOwnProperty.call(target, key)) {
					const value = target[key];
					cloneTarget[key] = cloneDeep(value, map);
				}
			}
		}

		return cloneTarget;
	} else {
		return target;
	}
}
