/**
 * 函数缓存（缓存函数返回值，避免重复计算）
 * @example 比如斐波拉契数列
 * @param fn
 * @param cacheKeyGenerator
 * @returns
 */

export function memoize<T extends (...args: any[]) => any>(
	fn: T,
	cacheKeyGenerator?: (any: Parameters<T>) => string
) {
	const cache = new Map<string, ReturnType<T>>();

	const memoized = function (...args: Parameters<T>): ReturnType<T> {
		const cacheKey = cacheKeyGenerator
			? cacheKeyGenerator(args)
			: JSON.stringify(args);

		if (cache.has(cacheKey)) {
			return cache.get(cacheKey) as ReturnType<T>;
		}

		const result = fn(...args);
		cache.set(cacheKey, result);
		return result;
	};

	memoized.clearCache = function () {
		cache.clear();
	};

	return memoized;
}
