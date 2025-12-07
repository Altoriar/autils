/**
 * 数组切片（封装原生，兼容类数组）
 * @param target
 * @param start
 * @param end
 * @returns
 */

import { isEmpty } from '../base/isEmpty';

export function slice<T>(target: T[], start = 0, end = target.length) {
	if (isEmpty(target) || !Array.isArray(target)) return target;

	if (start < 0) {
		start = 0;
	}
	if (end > target.length) {
		end = target.length;
	}

	const reuslt: T[] = [];

	for (let i = start; i < end; i++) {
		reuslt.push(target[i]);
	}

	return reuslt;
}
