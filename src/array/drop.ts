/**
 * 从数组开头移除指定数量的元素，默认移除一个
 * @param target
 * @param count
 * @returns
 */

export function drop<T>(target: T[], count = 1) {
	return target.slice(count);
}

/**
 * 从数组右侧开始移除指定数量的元素
 * @param target
 * @param count
 * @returns
 */
export function dropRight<T>(target: T[], count?: number): T[] {
	count = count || target.length;
	return target.slice(0, count - 1);
}
