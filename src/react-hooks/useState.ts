let hooks: any[] = [];
let hookIndex = 0;

export function useState<T>(initialValue: T) {
	// 取当前下标
	const currentIndex = hookIndex;

	// 初次渲染赋值
	if (hooks[currentIndex] === undefined) {
		hooks[currentIndex] = initialValue;
	}

	const setState = (newValue: T) => {
		hooks[currentIndex] = newValue;
		// render(); // 触发组件的重新执行，（模拟 React 更新过程）
	};

	hookIndex++;
	return [hooks[currentIndex], setState];
}
