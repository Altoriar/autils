/**
 * 睡眠方法
 * @param ms 毫秒 
 * @returns Promise<void>
 */
export const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) =>
		setTimeout(() => {
			resolve();
		}, ms),
	);
};
