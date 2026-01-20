let hooks: any[] = [];
let hookIndex = 0;

export function useEffect(effect: () => void | (() => void), deps: any[]) {
	let currentIndex = hookIndex;

	// 取出上一次的deps 和 cleanup
	const prev = hooks[currentIndex];
	let hasChanged = true;

	// 如果存在则进行比较
	if (prev) {
		const [oldDeps] = prev;
		hasChanged = !deps || deps.some((d, i) => d !== oldDeps[i]);
	}

	// 如果有变化，执行副作用，并将新的deps保存
	if (hasChanged) {
		setTimeout(() => {
			effect();
			hooks[currentIndex] = deps;
		});
	}

	hookIndex++;
}
