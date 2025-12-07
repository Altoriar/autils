/**
 * 函数缓存（缓存函数返回值，避免重复计算）
 * @example 比如斐波拉契数列
 * @param fn
 * @param cacheKeyGenerator
 * @returns
 */
export declare function memoize<T extends (...args: any[]) => any>(fn: T, cacheKeyGenerator?: (any: Parameters<T>) => string): {
    (...args: Parameters<T>): ReturnType<T>;
    clearCache(): void;
};
//# sourceMappingURL=memoize.d.ts.map