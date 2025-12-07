/**
 * 页面倒计时
 * @param duration
 * @param cb
 */
export function countDown(duration: number, cb: Function) {
	let timeLeft = duration;
	let result = '';

	const timerId = setInterval(() => {
		if (timeLeft <= 0) {
			cb('time over');
			clearInterval(timerId);
		}

		const hour = Math.floor(timeLeft / 3600);
		const minute = Math.floor((timeLeft % 3600) / 60);
		const second = Math.floor(timeLeft % 3600);
		result = `${hour}:${minute}${second}`;

		cb(result);
		timeLeft--;
	}, timeLeft);
}
