/**
 * 延迟执行函数（返回 Promise，如 delay(1000).then(()=>{})）
 * @param ms
 * @returns
 */
export function delay(ms: number): Promise<void> & { cancel: () => void } {
	let timerId: ReturnType<typeof setTimeout> | null = null;

	const delayPromise = new Promise<void>((resolve) => {
		timerId = setTimeout(() => {
			resolve();
			timerId = null;
		}, ms);
	}) as Promise<void> & { cancel: () => void };

	delayPromise.cancel = () => {
		if (timerId !== null) {
			clearTimeout(timerId);
			timerId = null;
		}
	};

	return delayPromise;
}
