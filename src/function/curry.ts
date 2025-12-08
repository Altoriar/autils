/**
 * 函数柯理化
 * @example（如 curry((a,b,c)=>a+b+c)(1)(2)(3) → 6）
 * @param fn
 * 
 * 核心逻辑拆解
    获取原函数形参个数：通过 fn.length 获取原函数定义的形参数量（如 (a,b,c)=>... 的 length 为 3），作为 “参数收集完成” 的判断依据。
    参数收集逻辑：
    若已收集的参数个数 ≥ 原函数形参个数 → 调用 fn.apply(this, args) 执行原函数，返回结果；
    若参数不足 → 返回新函数，新函数接收后续参数后，合并到已收集的参数中，递归调用核心收集函数。
    兼容分批传参：支持 curry(fn)(1,2)(3) 这种 “一次传多个参数” 的场景（通过 [...args, ...nextArgs] 合并参数）。


    // 测试1：基础场景（单参数分批传参）
        const add = (a: number, b: number, c: number) => a + b + c;
        const curriedAdd = curry(add);
        console.log(curriedAdd(1)(2)(3)); // 6 
        console.log(curriedAdd(1, 2)(3)); // 6 （分批传多个参数）
        console.log(curriedAdd(1)(2, 3)); // 6 

        // 测试2：绑定 this 场景（保留 this 指向）
        const obj = {
        base: 10,
        addBase: function (a: number, b: number) {
            return this.base + a + b;
        },
        };
        const curriedAddBase = curry(obj.addBase);
        const boundAddBase = curriedAddBase.bind(obj);
        console.log(boundAddBase(5)(6)); // 10+5+6=21 

        // 测试3：无参数/单参数函数
        const noArgFn = () => "hello";
        const curriedNoArg = curry(noArgFn);
        console.log(curriedNoArg()); // hello 

        const singleArgFn = (a: string) => a.toUpperCase();
        const curriedSingle = curry(singleArgFn);
        console.log(curriedSingle("test")); // TEST 
 */
export function curry<T extends (...args: any[]) => any>(fn: T) {
	// 获取原函数的形参个数（基于 Function.length）
	const fnArgLength = fn.length;

	// 递归接收参数的核心函数
	const curried = function collected(this: any, ...args: any[]) {
		// 场景1：已传入的参数个数 ≥ 原函数形参个数 -> 执行原函数
		if (args.length >= fnArgLength) {
			return fn.apply(this, args);
		}

		// 场景2：参数不足 → 返回新函数，继续收集参数
		return function (this: any, ...nextArgs: any[]) {
			// 合并已收集的参数 + 新传入的参数，递归调用 collected
			return collected.apply(this, [...args, ...nextArgs]);
		};
	};

	return curried;
}
