/**
 * 封装 localStorage 对象，简化操作
 */
export const storage = {
	get<T = unknown>(key: string): T | null {
		return JSON.parse(localStorage.getItem(key) || 'null');
	},

	set<T = unknown>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value || '[]'));
	},

	remove(key: string): void {
		localStorage.removeItem(key);
	},

	clear(): void {
		localStorage.clear();
	},
};
