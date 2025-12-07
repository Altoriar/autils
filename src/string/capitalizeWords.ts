import { capitalize } from './capitalize';

/**
 * 句子首字母大写
 * @example hello word -> Hello Word
 * @param str
 * @returns
 */
export function capitalizeWords(str: string): string {
	return str.split(' ').map(capitalize).join(' ');
}
