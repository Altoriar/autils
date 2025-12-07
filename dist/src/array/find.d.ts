/**
 * 查找数组中第一个满足条件的元素（原生 Array.find 封装，兼容低版本）
 * @param target
 * @param cb
 * @returns
 */
export declare function find<T>(target: T[], cb: (item: T, index: number, array: T[]) => boolean | undefined): T | undefined;
/**
 * 查找数组中第一个满足条件的元素索引
 * @param target
 * @param cb
 * @returns
 */
export declare function findIndex<T>(target: T[], cb: (item: T, index: number, array: T[]) => boolean | undefined): number;
//# sourceMappingURL=find.d.ts.map