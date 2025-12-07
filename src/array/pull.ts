import { isEmpty } from '../base/isEmpty';

/**
 * 移除数组中指定值（直接修改原数组，返回移除的元素）
 * @param target
 * @param value
 * @returns
 */
export function pull<T>(target: T[], ...values: T[]): T[] {
	if (!isEmpty(values)) return target;

	const removedItems: T[] = [];

	let i = 0;
	while (i < target.length) {
		const current = target[i];
		if (values.includes(current)) {
			const [removed] = target.splice(i, 1);
			removedItems.push(removed);
		} else {
			i++;
		}
	}

	return removedItems;
}
