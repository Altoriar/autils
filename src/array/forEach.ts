/**
 * 遍历数组（兼容类数组、空数组，避免原生遍历报错）
 * @param target
 * @param cb
 */

import { isEmpty } from '../base/isEmpty';

export function forEach<T>(
	target: T[],
	cb: (item: T, index: number, array: T[]) => void
): void {
	if (!Array.isArray(target) && isEmpty(target)) return;

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		cb(item, i, target);
	}
}
