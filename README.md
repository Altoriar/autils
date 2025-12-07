# 前端常用工具库源码实现
本仓库主要用于学习，对前端开发中常用的工具函数进行了源码开发，部分复杂功能函数只实现了核心逻辑。

# 基础判断类型（高频使用）
基础工具，解决原生 JS 类型判断不准确问题

1. isUndefined: 判断值是否为 undefined
2. isNull: 判断值是否为 null
3. isBoolean: 判断值是否为布尔类型（原生 typeof 实现，但统一封装更易用）
4. isNumber: 判断值是否为数字类型（排除 NaN，原生 typeof NaN === 'number' 有坑）
5. isString: 判断是否为字符串类型
6. isArray: 判断是否为数组（原生 Array.isArray 封装，兼容低版本环境）
7. isObject: 判断是否为纯对象（排除数组、null、函数、规则 typeof === 'object' && !isNull && !isArray）
8. isFunction: 判断是否为函数
9. isEmpty: 判断是否为空(空对象、空数组、空字符串、null、undefined 均返回 true)

# 数组操作（高频）
数组是前端最常用的数据结构，重点解决原生方法的兼容性和易用性

1. chunk: 将数组拆分为指定长度的二维数组（如 chunk([1,2,3,4], 2)） -> [[1,2], [3,4]]
2. compact: 移除数组中的假值（false/0/''/null/undefined/NaN）、
3. concat: 拼接数组/值（增强原色很难过 concat，支持多参数、非数组值拼接）
4. drop: 从数组开头移除指定数量的元素（默认移除一个）
5. dropRight: 从数组末尾移除指定数量的元素（默认移除一个）
6. find: 查找数组中第一个满足条件的元素（原生 Array.find 封装，兼容低版本）
7. findIndex: 查找数组中第一个满足条件的索引
8. filter: 过滤数组（原生 Array.fitler 封装，统一返回新数组）
9. forEach: 遍历数组（兼容类数组、空数组、避免原生遍历报错）
10. includes: 判断数组中是否包含指定值（增强原生，支持 NaN 检查）
11. indexOf: 查找值在数组中的索引（兼容 NaN，原生 indexOf(NaN) 返回 -1）
12. map: 数组映射（处理空数组、undefined 场景，避免报错）
13. pull: 移除数组中指定的值（直接修改原数组，返回移除的元素）
14. slice: 数组切片（封装原生，兼容类数组）
15. unique: 数组去重（基础set， 进阶版：支持对象数组按字段去重）
16. flatten: 数组扁平化（一维扁平化，如 flatten([1, [2, [3]]]) -> [1, 2, [3]]）
17. flattenMap: 数组深度扁平化（递归拆分为一维数组）

# 对象操作（高频）
解决原生对象操作繁琐、易出错问题

1. assign: 对象浅拷贝（封装原生 Object.assign，兼容低版本）
2. clone: 对象浅克隆（区分数组/对象，返回新实例）
3. cloneDeep: 对象深克隆（递归克隆，支持数组、对象、日期、正则等，解决循环引用问题）
4. keys: 获取对象的自有可枚举属性名（封装 Object.keys）
5. values: 获取对象的自有可枚举属性值（封装 Object.values）
6. entries: 获取对象的键值对属性（封装 Object.entries）
7. has: 判断对象是否包含指定属性（支持嵌套属性，如 has(obj, 'a.b.c[0]')）
8. get: 获取对象的嵌套属性（避免 obj.a.b.c 报错，支持默认值，如 get(obj, 'a.b.c', 'default')）
9. set: 设置对象的指定属性 (如 set(obj, 'a.b.c[0]', 10)，自动创建不存在嵌套层级)
10. omit: 移除对象的指定属性（返回新对象，如 omit(obj, ['a', 'b'])）
11. pick: 提取对象的指定属性（返回新对象，如 pick(obj, ['a', 'b'])）
12. isEmpty: 判断对象是否为空（无自有可枚举属性）

# 函数增强（中高频）
解决函数防抖、节流、柯理化等常见需求

1. debounce: 函数防抖（如搜索框、窗口resize，指定时间内只执行最后一次）
2. throttle: 函数节流（如滚动加载、按钮点击，指定时间内只执行一次）
3. once: 函数只执行一次（如初始化函数，多次调用仅首次生效）
4. curry: 函数柯理化（如 curry((a,b,c)=> a+b+c) -> (1)(2)(3) => 6）
5. memoize: 函数缓存（缓存函数返回值，避免重复计算，如斐波那契数列）

# 字符串操作（中高频）
1. camelCase: 字符串转驼峰命名（如 camelCase('hello-world') → 'helloWorld'）
2. kebabCase: 字符串转连字符命名（如 kebabCase('helloWorld') → 'hello-world'）
3. snakeCase: 字符串转下划线命名（如 snakeCase('helloWorld') → 'hello_world'）
4. trim: 移除字符串首尾空格（封装原生，兼容低版本）
5. padStart: 字符串开头补全（封装原生，如 padStart('123', 5, '0') → '00123'）
6. padEnd: 字符串结尾补全
7. startWith: 判断字符串是否以指定字符开头
8. endWith: 判断字符串是否以指定字符结尾

# 工具类（中低频）
1. random: 生成指定范围的随机数（如 random(1, 10) → 5）
2. range: 生成数字范围数组（如 range(1, 5) → [1,2,3,4]，支持步长）
3. delay: 延迟执行函数（返回 Promise，如 delay(1000).then(()=>{})）
4. uniqueId: 生成唯一 ID（如 uniqueId('prefix_') → 'prefix_123456'）

# React Hooks
实现原生 hook 核心逻辑和常用自定义 hook 逻辑封装

1. useState
2. useEffect
3. useContext
4. useRequest


# 封装 Ajax
1. ajax 

# 懒加载
1. lazyload

# 自定义 Promise
1. MyPromise

# 发布订阅
1. PubSub

# 数据结构
1. 队列 Queue
2. 双端队列 Deque
3. 优先级队列 PriorityQueue
4. 栈 Stack
5. 单向链表 LinkList
6. 双向链表 DoublyLinkList
7. 集合 Set
8. 字典 Dictionary
9. 哈希表 HashTable
10. 二叉搜索树 BinarySearchTree
11. 图 Graph

# 算法
1. 冒泡排序 bubbleSort
2. 选择排序 selectionSort
3. *插入排序 insertionSort
4. 希尔排序 shellSort
5. 归并排序 mergeSort
6. *快速排序 quickSort
7. 计数排序 countingSort
8. 桶排序 bucketSort
9. 二分查找 binarySearch
