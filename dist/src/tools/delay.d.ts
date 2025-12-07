/**
 * 延迟执行函数（返回 Promise，如 delay(1000).then(()=>{})）
 * @param ms
 * @returns
 */
export declare function delay(ms: number): Promise<void> & {
    cancel: () => void;
};
//# sourceMappingURL=delay.d.ts.map