/**
 * 判断数组是否包含指定值（增强原生，支持 NaN 检测）
 * @param target
 * @param value
 * @returns
 */
export function includes<T, U extends T>(target: T[], value: U): boolean {
	let exist = false;

	for (let i = 0; i < target.length; i++) {
		const item = target[i];
		if (item === value) {
			exist = true;
			break;
		}
	}

	return exist;
}
