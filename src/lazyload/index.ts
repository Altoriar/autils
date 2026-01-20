/**
 * 判断一个元素是否出现在当前视窗
 * @param el
 * @param cb
 */
export function observe(el: HTMLElement, cb: Function) {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				cb(entry);
				observer.unobserve(el);
			}
		});
	});

	observer.observe(el);
}

/**
 * 进阶：实现懒加载
 * <img src="temp_link" data-src="real_link" />
 * <img />
 * <img />
 */
export function lazyload<T>(element: T | T[]) {
	const imgs = element || document.querySelectorAll('img[data-src]');

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const img = entry.target as HTMLImageElement;
				const realSrc = img.getAttribute('data-src');
				if (realSrc) {
					img.src = realSrc;
				}
				obs.unobserve(img);
			}
		});
	});

	(imgs as NodeListOf<HTMLImageElement>)?.forEach((img) => {
		observer.observe(img);
	});
}
