(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["autils"] = factory(require("react"));
	else
		root["autils"] = factory(root["react"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_react__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Promise/index.ts":
/*!******************************!*\
  !*** ./src/Promise/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyPromise: () => (/* binding */ MyPromise)
/* harmony export */ });
class MyPromise {
    status = 'pending';
    data = undefined;
    callbacks = []; // 结构 {onResolved() {}, onRejected() {}}
    constructor(excutor) {
        this.status = 'pending';
        this.data = undefined;
        this.callbacks = [];
        const resolve = (value) => {
            if (this.status !== 'pending')
                return;
            this.status = 'resolved';
            this.data = value;
            if (this.callbacks.length > 0) {
                setTimeout(() => {
                    this.callbacks.forEach((cb) => {
                        cb.onResolved(value);
                    });
                });
            }
        };
        const reject = (reason) => {
            if (self.status !== 'pending')
                return;
            this.status = 'rejected';
            this.data = reason;
            if (this.callbacks.length > 0) {
                setTimeout(() => {
                    this.callbacks.forEach((cb) => {
                        cb.onRejected(reason);
                    });
                });
            }
        };
        try {
            excutor(resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    then(onResolved, onRejected) {
        onResolved =
            typeof onResolved === 'function' ? onResolved : (value) => value;
        onRejected =
            typeof onRejected === 'function'
                ? onRejected
                : (reason) => {
                    throw reason;
                };
        return new Promise((resolve, reject) => {
            const handle = (callback) => {
                // 回调函数抛出异常样
                try {
                    const result = callback(this.data);
                    // 如果回调函数返回的是 Promise，则改变 Promise 的状态，否则将值返回
                    if (result instanceof Promise) {
                        result.then(resolve, reject);
                    }
                    else {
                        resolve(result);
                    }
                }
                catch (error) {
                    reject(error);
                }
            };
            if (this.status === 'pending') {
                this.callbacks.push({
                    onResolved(value) {
                        handle(onResolved);
                    },
                    onRejected(value) {
                        handle(onRejected);
                    },
                });
            }
            else if (this.status === 'resolved') {
                setTimeout(() => {
                    handle(onResolved);
                });
            }
            else {
                setTimeout(() => {
                    handle(onRejected);
                });
            }
        });
    }
    catch(onRejected) {
        this.then(undefined, onRejected);
    }
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            }
        });
    }
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    }
    // Promise.all([fetch(), fetch()])
    /* Promise函数对象all方法，接收promise数组，只有所有promise对象成功返回成功，否则返回失败 */
    static all(promises) {
        let promiseCount = 0;
        const values = new Array(promises.length);
        return new Promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                promise.then((value) => {
                    promiseCount++;
                    values[index] = value;
                    if (promiseCount === promises.length) {
                        resolve(values);
                    }
                }, (reason) => {
                    reject(reason);
                });
            });
        });
    }
    /* Promise函数对象race方法，其结果由第一个完成的promise结果决定 */
    static race(promises) {
        return new Promise((resovle, reject) => {
            promises.forEach((promise) => {
                promise.then((value) => {
                    resovle(value);
                }, (reason) => {
                    reject(reason);
                });
            });
        });
    }
}


/***/ }),

/***/ "./src/PubSub/index.ts":
/*!*****************************!*\
  !*** ./src/PubSub/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pubsub: () => (/* binding */ pubsub)
/* harmony export */ });
class PubSub {
    channels = {};
    on(key, callback) {
        if (!this.channels.key) {
            this.channels[key] = [callback];
        }
        else {
            this.channels[key]?.push(callback);
        }
    }
    emit(key, ...args) {
        this.channels[key]?.forEach((cb) => cb(args));
    }
    off(key) {
        this.channels[key] = [];
    }
    clear() {
        this.channels = {};
    }
}
const pubsub = new PubSub();


/***/ }),

/***/ "./src/ajax/index.ts":
/*!***************************!*\
  !*** ./src/ajax/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ajax: () => (/* binding */ ajax)
/* harmony export */ });
function ajax(config, cb) {
    const { method, url } = config;
    const xhr = new XMLHttpRequest();
    if (method === 'GET') {
        let paramsStr = '?';
        if (config?.params) {
            paramsStr += Object.entries(config.params)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');
        }
        xhr.open(method, `${url}${paramsStr}`);
        xhr.send();
    }
    else if (method === 'POST') {
        xhr.open(method, url);
        xhr.send(config.data);
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            cb(xhr.responseText);
        }
    };
}


/***/ }),

/***/ "./src/array/chunk.ts":
/*!****************************!*\
  !*** ./src/array/chunk.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   chunk: () => (/* binding */ chunk)
/* harmony export */ });
/**
 * 将数组拆分为指定长度的二维数组
 * @example（如 chunk([1,2,3,4], 2) → [[1,2],[3,4]]）
 * @param target
 * @param size
 * @returns
 */
function chunk(target, size) {
    const result = [];
    for (let i = 0; i < target.length; i += size) {
        result.push(target.slice(i, i + size));
    }
    return result;
}


/***/ }),

/***/ "./src/array/compact.ts":
/*!******************************!*\
  !*** ./src/array/compact.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   compact: () => (/* binding */ compact)
/* harmony export */ });
/**
 * 移除数组中的假值
 * @example（false/0/''/null/undefined/NaN)
 * @param target
 * @returns
 */
function compact(target) {
    return target.filter((item) => item);
}


/***/ }),

/***/ "./src/array/concat.ts":
/*!*****************************!*\
  !*** ./src/array/concat.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   concat: () => (/* binding */ concat)
/* harmony export */ });
/**
 * 拼接数组 / 值
 * @example（增强原生 concat，支持多参数、非数组值拼接）
 * @param target
 * @param args
 */
function concat(target, ...args) {
    const result = [...target];
    args.forEach((arg) => {
        if (Array.isArray(arg)) {
            result.push(...arg);
        }
        else {
            result.push(arg);
        }
    });
    return result;
}


/***/ }),

/***/ "./src/array/drop.ts":
/*!***************************!*\
  !*** ./src/array/drop.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   drop: () => (/* binding */ drop),
/* harmony export */   dropRight: () => (/* binding */ dropRight)
/* harmony export */ });
/**
 * 从数组开头移除指定数量的元素，默认移除一个
 * @param target
 * @param count
 * @returns
 */
function drop(target, count = 1) {
    return target.slice(count);
}
/**
 * 从数组右侧开始移除指定数量的元素
 * @param target
 * @param count
 * @returns
 */
function dropRight(target, count) {
    count = count || target.length;
    return target.slice(0, count - 1);
}


/***/ }),

/***/ "./src/array/filter.ts":
/*!*****************************!*\
  !*** ./src/array/filter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   filter: () => (/* binding */ filter)
/* harmony export */ });
/**
 * 过滤数组（原生封装，统一返回新数组）
 * @param target
 * @param cb
 * @returns
 */
function filter(target, cb) {
    const reuslt = [];
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (cb(item, i, target)) {
            reuslt.push(item);
        }
    }
    return reuslt;
}


/***/ }),

/***/ "./src/array/find.ts":
/*!***************************!*\
  !*** ./src/array/find.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   findIndex: () => (/* binding */ findIndex)
/* harmony export */ });
/**
 * 查找数组中第一个满足条件的元素（原生 Array.find 封装，兼容低版本）
 * @param target
 * @param cb
 * @returns
 */
function find(target, cb) {
    let result = undefined;
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (cb(item, i, target)) {
            result = item;
            break;
        }
    }
    return result;
}
/**
 * 查找数组中第一个满足条件的元素索引
 * @param target
 * @param cb
 * @returns
 */
function findIndex(target, cb) {
    let index = 0;
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (cb(item, i, target)) {
            index = i;
            break;
        }
    }
    return index;
}


/***/ }),

/***/ "./src/array/flatten.ts":
/*!******************************!*\
  !*** ./src/array/flatten.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   flatten: () => (/* binding */ flatten)
/* harmony export */ });
/**
 * 数组扁平化
 * @param arr
 * @param depth
 * @returns
 */
function flatten(arr, depth = Infinity) {
    return arr.reduce((pre, next) => {
        if (Array.isArray(next) && depth > 0) {
            pre.push(...flatten(next, depth - 1));
        }
        else {
            pre.push(next);
        }
        return pre;
    }, []);
}
// export function flatten<T>(arr: any[], depth = Infinity): T[] {
// 	return arr.reduce<T[]>((pre, next) => {
// 		if (Array.isArray(next) && depth > 0) {
// 			pre.push(...flatten(next, depth - 1));
// 		} else {
// 			pre.push(next);
// 		}
// 		return pre;
// 	}, []);
// }


/***/ }),

/***/ "./src/array/forEach.ts":
/*!******************************!*\
  !*** ./src/array/forEach.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   forEach: () => (/* binding */ forEach)
/* harmony export */ });
/* harmony import */ var _base_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/isEmpty */ "./src/base/isEmpty.ts");
/**
 * 遍历数组（兼容类数组、空数组，避免原生遍历报错）
 * @param target
 * @param cb
 */

function forEach(target, cb) {
    if (!Array.isArray(target) && (0,_base_isEmpty__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(target))
        return;
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        cb(item, i, target);
    }
}


/***/ }),

/***/ "./src/array/includes.ts":
/*!*******************************!*\
  !*** ./src/array/includes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   includes: () => (/* binding */ includes)
/* harmony export */ });
/**
 * 判断数组是否包含指定值（增强原生，支持 NaN 检测）
 * @param target
 * @param value
 * @returns
 */
function includes(target, value) {
    let exist = false;
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (item === value) {
            exist = true;
            break;
        }
    }
    return exist;
}


/***/ }),

/***/ "./src/array/indexOf.ts":
/*!******************************!*\
  !*** ./src/array/indexOf.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   indexOf: () => (/* binding */ indexOf)
/* harmony export */ });
/**
 * 查找值在数组中的索引（兼容 NaN，原生 indexOf(NaN) 返回 -1）
 * @param target
 * @param value
 * @param fromIndex
 * @returns
 */
function indexOf(target, value, fromIndex) {
    fromIndex = fromIndex || 1;
    let tempIndex = 1;
    let index = -1;
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        if (item === value && tempIndex !== fromIndex) {
            tempIndex++;
        }
        else if (item === value && tempIndex === fromIndex) {
            index = i;
            break;
        }
    }
    return index;
}


/***/ }),

/***/ "./src/array/map.ts":
/*!**************************!*\
  !*** ./src/array/map.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   map: () => (/* binding */ map)
/* harmony export */ });
function map(target, cb) {
    const reuslt = [];
    for (let i = 0; i < target.length; i++) {
        const item = target[i];
        reuslt.push(cb(item, i, target));
    }
    return reuslt;
}


/***/ }),

/***/ "./src/array/merge.ts":
/*!****************************!*\
  !*** ./src/array/merge.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   merge: () => (/* binding */ merge)
/* harmony export */ });
/**
 * 将arr中没有的元素，合并到arr中
 * @param arr
 * @param arrs
 * @returns
 */
function merge(arr, ...arrs) {
    const result = [...arr];
    arrs?.forEach((arr) => {
        arr.forEach((item) => {
            if (!result.includes(item)) {
                result.push(item);
            }
        });
    });
    return result;
}


/***/ }),

/***/ "./src/array/pull.ts":
/*!***************************!*\
  !*** ./src/array/pull.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pull: () => (/* binding */ pull)
/* harmony export */ });
/* harmony import */ var _base_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/isEmpty */ "./src/base/isEmpty.ts");

/**
 * 移除数组中指定值（直接修改原数组，返回移除的元素）
 * @param target
 * @param value
 * @returns
 */
function pull(target, ...values) {
    if (!(0,_base_isEmpty__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(values))
        return target;
    const removedItems = [];
    let i = 0;
    while (i < target.length) {
        const current = target[i];
        if (values.includes(current)) {
            const [removed] = target.splice(i, 1);
            removedItems.push(removed);
        }
        else {
            i++;
        }
    }
    return removedItems;
}


/***/ }),

/***/ "./src/array/slice.ts":
/*!****************************!*\
  !*** ./src/array/slice.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   slice: () => (/* binding */ slice)
/* harmony export */ });
/* harmony import */ var _base_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../base/isEmpty */ "./src/base/isEmpty.ts");
/**
 * 数组切片（封装原生，兼容类数组）
 * @param target
 * @param start
 * @param end
 * @returns
 */

function slice(target, start = 0, end = target.length) {
    if ((0,_base_isEmpty__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(target) || !Array.isArray(target))
        return target;
    if (start < 0) {
        start = 0;
    }
    if (end > target.length) {
        end = target.length;
    }
    const reuslt = [];
    for (let i = start; i < end; i++) {
        reuslt.push(target[i]);
    }
    return reuslt;
}


/***/ }),

/***/ "./src/array/unique.ts":
/*!*****************************!*\
  !*** ./src/array/unique.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   unique: () => (/* binding */ unique)
/* harmony export */ });
/**
 * 数组去重（基础版：基于 Set；TODO: 进阶版：支持对象数组按字段去重）
 * @param arr
 * @returns
 */
function unique(arr) {
    return Array.from(new Set(arr));
}


/***/ }),

/***/ "./src/base/isArray.ts":
/*!*****************************!*\
  !*** ./src/base/isArray.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isArray: () => (/* binding */ isArray)
/* harmony export */ });
function isArray(value) {
    return Array.isArray(value);
}


/***/ }),

/***/ "./src/base/isBoolean.ts":
/*!*******************************!*\
  !*** ./src/base/isBoolean.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBoolean: () => (/* binding */ isBoolean)
/* harmony export */ });
function isBoolean(value) {
    return typeof value === 'boolean';
}


/***/ }),

/***/ "./src/base/isEmpty.ts":
/*!*****************************!*\
  !*** ./src/base/isEmpty.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEmpty: () => (/* binding */ isEmpty)
/* harmony export */ });
function isEmpty(value) {
    return (value === undefined ||
        value === null ||
        value === '' ||
        JSON.stringify(value) === '{}' ||
        JSON.stringify(value) === '[]');
}


/***/ }),

/***/ "./src/base/isFunction.ts":
/*!********************************!*\
  !*** ./src/base/isFunction.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction)
/* harmony export */ });
function isFunction(value) {
    return typeof value === 'function';
}


/***/ }),

/***/ "./src/base/isNull.ts":
/*!****************************!*\
  !*** ./src/base/isNull.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNull: () => (/* binding */ isNull)
/* harmony export */ });
function isNull(value) {
    return value === null;
}


/***/ }),

/***/ "./src/base/isNumber.ts":
/*!******************************!*\
  !*** ./src/base/isNumber.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isNumber: () => (/* binding */ isNumber)
/* harmony export */ });
function isNumber(value) {
    return typeof value === 'number';
}


/***/ }),

/***/ "./src/base/isObject.ts":
/*!******************************!*\
  !*** ./src/base/isObject.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isObject: () => (/* binding */ isObject)
/* harmony export */ });
function isObject(value) {
    return typeof value === 'object' && value !== null;
}


/***/ }),

/***/ "./src/base/isString.ts":
/*!******************************!*\
  !*** ./src/base/isString.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isString: () => (/* binding */ isString)
/* harmony export */ });
function isString(value) {
    return typeof value === 'string';
}


/***/ }),

/***/ "./src/base/isUndefined.ts":
/*!*********************************!*\
  !*** ./src/base/isUndefined.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isUndefined: () => (/* binding */ isUndefined)
/* harmony export */ });
function isUndefined(value) {
    return typeof value === 'undefined';
}


/***/ }),

/***/ "./src/da/LinkedList.ts":
/*!******************************!*\
  !*** ./src/da/LinkedList.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedList: () => (/* binding */ LinkedList)
/* harmony export */ });
/**
 * 链表
 * 查看节点个数：size
 * 判断链表是否为空：isEmpty
 * 追加节点：append
 * 在指定位置插入节点：insert
 * 删除指定位置的节点：removeAt
 * 查看指定位置的节点：get
 * 删除指定值节点：remove
 * 链表转数组：toArray
 */
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
class LinkedList {
    head = null;
    length = 0;
    size() {
        return this.length;
    }
    isEmpty() {
        return this.length === 0;
    }
    // 追加节点
    append(value) {
        const node = new ListNode(value);
        if (!this.head) {
            this.head = node;
        }
        else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.length++;
    }
    // 在指定位置插入节点
    insert(index, value) {
        if (index < 0 || index > this.length)
            return false;
        const node = new ListNode(value);
        // 头部插入
        if (index === 0) {
            node.next = this.head;
            this.head = node;
        }
        else {
            let current = this.head;
            let prev = null;
            let i = 0;
            while (i++ < index) {
                prev = current;
                current = current.next;
            }
            node.next = current;
            prev.next = node;
        }
        this.length++;
        return true;
    }
    // 获取指定元素
    get(index) {
        if (index < 0 || index > this.length)
            return null;
        let current = this.head;
        let i = 0;
        while (i++ < index) {
            current = current.next;
        }
        return current.value;
    }
    // 查找某一个元素的索引，不存在则返回 -1
    indexOf(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value)
                return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    // 删除指定位置的节点
    removeAt(index) {
        if (index < 0 || index > this.length)
            return null;
        let current = this.head;
        let prev = null;
        // 头部特殊处理
        if (index === 0) {
            this.head = current.next;
        }
        else {
            let i = 0;
            while (i++ < index) {
                prev = current;
                current = current.next;
            }
            prev.next = current.next;
        }
        this.length--;
        return current.value;
    }
    // 删除指定值节点
    remove(value) {
        const index = this.indexOf(value);
        if (index === -1)
            return false;
        return this.removeAt(index) !== null;
    }
    // 链表转数组，方便操作
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    toString() {
        const array = this.toArray();
        let result = '';
        array.forEach((item, index) => {
            result += `${item}${index === array.length - 1 ? '' : ','}`;
        });
        return result;
    }
}


/***/ }),

/***/ "./src/da/Queue.ts":
/*!*************************!*\
  !*** ./src/da/Queue.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
/**
 * 队列
 * 入队: enqueue(item: T): void
 * 出队: dequeue(item: T): T | undefined
 * 查看队头: peek(): T
 * 查看元素个数: size(): number
 * 判断队列是否为空: isEmpty(): boolean
 */
class Queue {
    items = [];
    constructor() {
        this.items = [];
    }
    // 添加元素
    enqueue(item) {
        this.items.push(item);
    }
    // 删除元素
    dequeue() {
        const removed = this.items.pop();
        return removed;
    }
    // 查看队头
    peek() {
        return this.items[0];
    }
    size() {
        return this.items.length;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    clear() {
        this.items = [];
    }
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let str = '';
        this.items.forEach((item, index) => {
            str += `${item} -> ${index}，`;
        });
        return str;
    }
}


/***/ }),

/***/ "./src/da/Stack.ts":
/*!*************************!*\
  !*** ./src/da/Stack.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Stack: () => (/* binding */ Stack)
/* harmony export */ });
/**
 * 栈
 * 入栈：push
 * 出栈：pop
 * 查看栈顶：peek
 * 返回栈长度：size
 * 判断栈是否为空：isEmpty
 */
class Stack {
    items = [];
    constructor() {
        this.items = [];
    }
    // 入栈
    push(item) {
        this.items.push(item);
    }
    // 出栈
    pop() {
        return this.items.pop();
    }
    // 查看栈顶
    peek() {
        return this.items[this.items.length - 1];
    }
    // 返回栈长度
    size() {
        return this.items.length;
    }
    // 判断栈是否为空
    isEmpty() {
        return this.items.length === 0;
    }
    toString() {
        if (this.isEmpty())
            return '';
        let reuslt = '';
        for (let i = 0; i < this.items.length; i++) {
            reuslt += `${this.items[i]} -> ${i}，`;
        }
        return reuslt;
    }
}


/***/ }),

/***/ "./src/function/apply.ts":
/*!*******************************!*\
  !*** ./src/function/apply.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   apply: () => (/* binding */ apply)
/* harmony export */ });
function apply(fn, context, args) {
    if (!context) {
        context = window;
    }
    context.fn = fn;
    const result = context.fn(args);
    delete context.fn;
    return result;
}


/***/ }),

/***/ "./src/function/bind.ts":
/*!******************************!*\
  !*** ./src/function/bind.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bind: () => (/* binding */ bind)
/* harmony export */ });
function bind(fn, context, ...args) {
    return function (...innerArgs) {
        if (!context) {
            context = window;
        }
        context.fn = fn;
        const result = context.fn([...args, ...innerArgs]);
        delete context.fn;
        return result;
    };
}


/***/ }),

/***/ "./src/function/call.ts":
/*!******************************!*\
  !*** ./src/function/call.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   call: () => (/* binding */ call)
/* harmony export */ });
function call(fn, context, ...args) {
    if (!context) {
        context = window;
    }
    context.fn = fn;
    const result = context.fn(...args);
    delete context.fn;
    return result;
}


/***/ }),

/***/ "./src/function/curry.ts":
/*!*******************************!*\
  !*** ./src/function/curry.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   curry: () => (/* binding */ curry)
/* harmony export */ });
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
function curry(fn) {
    // 获取原函数的形参个数（基于 Function.length）
    const fnArgLength = fn.length;
    // 递归接收参数的核心函数
    const curried = function collected(...args) {
        // 场景1：已传入的参数个数 ≥ 原函数形参个数 -> 执行原函数
        if (args.length >= fnArgLength) {
            return fn.apply(this, args);
        }
        // 场景2：参数不足 → 返回新函数，继续收集参数
        return function (...nextArgs) {
            // 合并已收集的参数 + 新传入的参数，递归调用 collected
            return collected.apply(this, [...args, ...nextArgs]);
        };
    };
    return curried;
}


/***/ }),

/***/ "./src/function/debounce.ts":
/*!**********************************!*\
  !*** ./src/function/debounce.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounce: () => (/* binding */ debounce),
/* harmony export */   firstDebounce: () => (/* binding */ firstDebounce)
/* harmony export */ });
function debounce(cb, delay) {
    let timerId = null;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            cb.apply(this, args);
            timerId = null;
        }, delay);
    };
}
function firstDebounce(cb, delay) {
    let timerId = null;
    let isCooldown = false;
    return function (...args) {
        if (!isCooldown) {
            cb.apply(this, args);
            isCooldown = true;
            timerId = setTimeout(() => {
                isCooldown = false;
                cb.apply(this, args);
                timerId = null;
            }, delay);
        }
    };
}


/***/ }),

/***/ "./src/function/memoize.ts":
/*!*********************************!*\
  !*** ./src/function/memoize.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   memoize: () => (/* binding */ memoize)
/* harmony export */ });
/**
 * 函数缓存（缓存函数返回值，避免重复计算）
 * @example 比如斐波拉契数列
 * @param fn
 * @param cacheKeyGenerator
 * @returns
 */
function memoize(fn, cacheKeyGenerator) {
    const cache = new Map();
    const memoized = function (...args) {
        const cacheKey = cacheKeyGenerator
            ? cacheKeyGenerator(args)
            : JSON.stringify(args);
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }
        const result = fn(...args);
        cache.set(cacheKey, result);
        return result;
    };
    memoized.clearCache = function () {
        cache.clear();
    };
    return memoized;
}


/***/ }),

/***/ "./src/function/once.ts":
/*!******************************!*\
  !*** ./src/function/once.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   once: () => (/* binding */ once)
/* harmony export */ });
/**
 * 函数只执行一次（如初始化函数，多次调用仅首次生效）
 * @param fn
 * @returns
 */
function once(fn) {
    let called = false;
    return function (...args) {
        if (called)
            return;
        called = true;
        fn(...args);
    };
}


/***/ }),

/***/ "./src/function/throttle.ts":
/*!**********************************!*\
  !*** ./src/function/throttle.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   throttle: () => (/* binding */ throttle)
/* harmony export */ });
function throttle(cb, delay) {
    let pre = 0;
    return function (...arg) {
        const now = Date.now();
        if (now - pre > delay) {
            cb.apply(this, arg);
            pre = now;
        }
    };
}


/***/ }),

/***/ "./src/object/clone.ts":
/*!*****************************!*\
  !*** ./src/object/clone.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clone: () => (/* binding */ clone)
/* harmony export */ });
/**
 * 浅克隆
 * @param target
 * @returns
 */
function clone(target) {
    if (Array.isArray(target)) {
        return Array.from(target);
    }
    else if (target !== null && typeof target === 'object') {
        return Object.assign({}, target);
    }
    else {
        return target;
    }
}


/***/ }),

/***/ "./src/object/cloneDeep.ts":
/*!*********************************!*\
  !*** ./src/object/cloneDeep.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cloneDeep: () => (/* binding */ cloneDeep)
/* harmony export */ });
/**
 * 深克隆
 * @param target
 * @param map
 * @returns
 */
function cloneDeep(target, map = new Map()) {
    if (Array.isArray(target) ||
        (target !== null && typeof target === 'object')) {
        let cloneTarget = map.get(target);
        if (cloneTarget) {
            return cloneTarget;
        }
        if (Array.isArray(target)) {
            cloneTarget = [];
            map.set(target, cloneTarget);
            target.forEach((item, index) => {
                cloneTarget[index] = cloneDeep(item, map);
            });
        }
        else {
            cloneTarget = {};
            map.set(target, cloneTarget);
            for (const key in target) {
                if (Object.hasOwnProperty.call(target, key)) {
                    const value = target[key];
                    cloneTarget[key] = cloneDeep(value, map);
                }
            }
        }
        return cloneTarget;
    }
    else {
        return target;
    }
}


/***/ }),

/***/ "./src/object/entries.ts":
/*!*******************************!*\
  !*** ./src/object/entries.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   entries: () => (/* binding */ entries)
/* harmony export */ });
/**
 * 获取对象的键值对数组（封装 Object.entries）
 * @param target
 * @returns
 */
function entries(target) {
    const reuslt = [];
    for (const key in target) {
        reuslt.push([key, target[key]]);
    }
    return reuslt;
}


/***/ }),

/***/ "./src/object/get.ts":
/*!***************************!*\
  !*** ./src/object/get.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   get: () => (/* binding */ get)
/* harmony export */ });
/**
 * 获取对象的嵌套属性（避免 obj.a.b.c 报错，支持默认值，如 get(obj, 'a.b.c', 'default')）
 * @param target
 * @param path
 * @param defultValue
 * @returns
 */
function get(target, path, defultValue) {
    if (path === '')
        return target;
    const keys = path
        ?.replace(/\[(\d+)\]/, '.$1')
        ?.split('.')
        .filter(Boolean);
    let result = target;
    keys?.forEach((key) => {
        result = result[key];
    });
    return result || defultValue;
}


/***/ }),

/***/ "./src/object/has.ts":
/*!***************************!*\
  !*** ./src/object/has.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   has: () => (/* binding */ has)
/* harmony export */ });
/**
 * 判断对象是否包含指定属性
 * @example TODO:（支持嵌套属性，如 has(obj, 'a.b.c')）兼容数组取值a.b[0]
 * @param target
 * @param path
 * @returns
 */
function has(target, path) {
    if (path === '')
        return false;
    const keys = path
        .replace(/\[(d+)\]/, '.$1')
        .split('.')
        .filter(Boolean);
    let result = target;
    keys.forEach((key) => {
        result = result[key];
    });
    return !!result;
}


/***/ }),

/***/ "./src/object/keys.ts":
/*!****************************!*\
  !*** ./src/object/keys.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   keys: () => (/* binding */ keys)
/* harmony export */ });
/**
 * 获取对象的自有可枚举属性名（封装 Object.keys）
 * @param target
 * @returns
 */
function keys(target) {
    const reuslt = [];
    for (const key in target) {
        reuslt.push(key);
    }
    return reuslt;
}


/***/ }),

/***/ "./src/object/newInstance.ts":
/*!***********************************!*\
  !*** ./src/object/newInstance.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   newInstance: () => (/* binding */ newInstance)
/* harmony export */ });
function newInstance(Fn, ...args) {
    const obj = {};
    const result = Fn.apply(obj, args);
    if (result instanceof Object) {
        return result;
    }
    Object.setPrototypeOf(obj, Fn.prototype);
    return obj;
}


/***/ }),

/***/ "./src/object/omit.ts":
/*!****************************!*\
  !*** ./src/object/omit.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   omit: () => (/* binding */ omit)
/* harmony export */ });
/**
 * 移除对象的指定属性, 返回新对象，
 * @example 如 omit(obj, ['a', 'b'])
 * @param target
 * @param keys
 * @returns
 */
function omit(target, keys) {
    const result = { ...target };
    for (const key of keys) {
        if (key in result) {
            delete result[key];
        }
    }
    return result;
}


/***/ }),

/***/ "./src/object/pick.ts":
/*!****************************!*\
  !*** ./src/object/pick.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pick: () => (/* binding */ pick)
/* harmony export */ });
/**
 * 提取指定的对象属性（返回新对象，
 * @example 如 pick(obj, ['a', 'b'])
 * @param target
 * @param keys
 * @returns
 */
function pick(target, keys) {
    const result = {};
    for (const key of keys) {
        if (key in target) {
            result[key] = target[key];
        }
    }
    return result;
}


/***/ }),

/***/ "./src/object/set.ts":
/*!***************************!*\
  !*** ./src/object/set.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   set: () => (/* binding */ set)
/* harmony export */ });
function set(target, path, value) {
    const keys = path
        .replace(/\[(d+)]/g, '.$1')
        .split('.')
        .filter(Boolean);
    let reuslt = target;
    let isLastIndex = keys.length - 1;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const isLastKey = isLastIndex === i;
        if (!isLastKey && !(key in reuslt)) {
            reuslt[key] = /^\d+$/.test(key) ? [] : {};
        }
        if (isLastKey) {
            reuslt[key] = value;
        }
        else {
            reuslt = reuslt[key];
        }
    }
    return reuslt;
}


/***/ }),

/***/ "./src/object/values.ts":
/*!******************************!*\
  !*** ./src/object/values.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   values: () => (/* binding */ values)
/* harmony export */ });
/**
 * 获取对象的自有可枚举属性值（封装 Object.values）
 * @param target
 * @returns
 */
function values(target) {
    const reuslt = [];
    for (const key in target) {
        reuslt.push(target[key]);
    }
    return reuslt;
}


/***/ }),

/***/ "./src/react-hooks/useContext.tsx":
/*!****************************************!*\
  !*** ./src/react-hooks/useContext.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createContext: () => (/* binding */ createContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/**
 * 简易实现 createContext 和 useContext
 * @param defaultValue
 * @returns
 */
function createContext(defaultValue) {
    let currentValue = defaultValue;
    let listeners = [];
    function Provider(props) {
        currentValue = props.value;
        // 通知所有使用 useContext 的组件更新
        listeners.forEach((fn) => fn(currentValue));
        return props.children;
    }
    function useContext() {
        const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(currentValue);
        // 订阅 Provider 更新，在 useEffect 中，因为组件每次重新渲染都要执行
        (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
            const listener = (val) => setState(val);
            listeners.push(listener);
            return () => {
                listeners = listeners.filter((fn) => fn !== listener);
            };
        }, []);
        return state;
    }
    return { Provider, useContext };
}
/* 使用


const ThemeContext = createContext('light');

function App() {
    const [theme, setTheme] = useState('dark');

    return (
        <ThemeContext.Provider value={theme}>
            <Child />
            <button onClick={() => setTheme('light')}>toggle</button>
        </ThemeContext.Provider>
    );
}

function Child() {
    const theme = ThemeContext.useContext();

    return <div>{theme}</div>;
}

*/


/***/ }),

/***/ "./src/react-hooks/useEffect.ts":
/*!**************************************!*\
  !*** ./src/react-hooks/useEffect.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useEffect: () => (/* binding */ useEffect)
/* harmony export */ });
let hooks = [];
let hookIndex = 0;
function useEffect(effect, deps) {
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
            hooks[currentIndex] = [deps];
        });
    }
    hookIndex++;
}


/***/ }),

/***/ "./src/react-hooks/useRequest.ts":
/*!***************************************!*\
  !*** ./src/react-hooks/useRequest.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRequest: () => (/* binding */ useRequest)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useRequest(config) {
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const [error, setError] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');
    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)();
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(config);
            setData(res);
        }
        catch (e) {
            setError(e);
        }
        finally {
            setLoading(false);
        }
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        fetchData();
    }, []);
    return { loading, error, data, refresh: fetchData };
}


/***/ }),

/***/ "./src/react-hooks/useState.ts":
/*!*************************************!*\
  !*** ./src/react-hooks/useState.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useState: () => (/* binding */ useState)
/* harmony export */ });
let hooks = [];
let hookIndex = 0;
function useState(initialValue) {
    // 取当前下标
    const currentIndex = hookIndex;
    // 初次渲染赋值
    if (hooks[currentIndex] === undefined) {
        hooks[currentIndex] = initialValue;
    }
    const setState = (newValue) => {
        hooks[currentIndex] = newValue;
        // render(); // 触发组件的重新执行，（模拟 React 更新过程）
    };
    hookIndex++;
    return [hooks[currentIndex], setState];
}


/***/ }),

/***/ "./src/string/camelCase.ts":
/*!*********************************!*\
  !*** ./src/string/camelCase.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   camelCase: () => (/* binding */ camelCase)
/* harmony export */ });
/**
 * 字符串转驼峰
 * @example （如 camelCase('hello-world') → 'helloWorld'）
 * @param str
 * @returns
 */
function camelCase(str) {
    return str
        .split('-')
        .map((word, index) => index === 0 ? word : word?.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}


/***/ }),

/***/ "./src/string/capitalize.ts":
/*!**********************************!*\
  !*** ./src/string/capitalize.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize)
/* harmony export */ });
/**
 * 字符串首字母大写
 * @example hello -> Hello
 * @param str
 * @returns
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


/***/ }),

/***/ "./src/string/capitalizeWords.ts":
/*!***************************************!*\
  !*** ./src/string/capitalizeWords.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalizeWords: () => (/* binding */ capitalizeWords)
/* harmony export */ });
/* harmony import */ var _capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capitalize */ "./src/string/capitalize.ts");

/**
 * 句子首字母大写
 * @example hello word -> Hello Word
 * @param str
 * @returns
 */
function capitalizeWords(str) {
    return str.split(' ').map(_capitalize__WEBPACK_IMPORTED_MODULE_0__.capitalize).join(' ');
}


/***/ }),

/***/ "./src/string/countChars.ts":
/*!**********************************!*\
  !*** ./src/string/countChars.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   countChars: () => (/* binding */ countChars)
/* harmony export */ });
/**
 * 统计字符串中每个字符出现的次数
 * @param str
 * @returns
 */
function countChars(str) {
    const countMap = {};
    for (const char of str) {
        countMap[char] = (countMap[char] || 0) + 1;
    }
    return countMap;
}


/***/ }),

/***/ "./src/string/endWith.ts":
/*!*******************************!*\
  !*** ./src/string/endWith.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   endWith: () => (/* binding */ endWith)
/* harmony export */ });
/**
 * endsWith：判断字符串是否以指定值结尾
 * @param str
 * @param prefix
 * @returns
 */
function endWith(str, prefix) {
    const strPrefix = str.slice(str.length - prefix.length);
    return strPrefix === prefix;
}


/***/ }),

/***/ "./src/string/isAnagram.ts":
/*!*********************************!*\
  !*** ./src/string/isAnagram.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isAnagram: () => (/* binding */ isAnagram)
/* harmony export */ });
/**
 * 判断两个字符串是否是字母同异位
 * @param str1
 * @param str2
 * @returns
 */
function isAnagram(str1, str2) {
    return str1.split('').sort().join('') === str2.split('').sort().join('');
}


/***/ }),

/***/ "./src/string/kebabCase.ts":
/*!*********************************!*\
  !*** ./src/string/kebabCase.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kebabCase: () => (/* binding */ kebabCase)
/* harmony export */ });
/**
 * 字符串转连字符（如 kebabCase('helloWorld') → 'hello-world'
 * @param str
 * @returns
 */
function kebabCase(str) {
    return (str
        // 步骤1：处理驼峰/帕斯卡命名（大写字母前加连字符）
        // 如 helloWorld → hello-World，HelloWorld → -Hello-World
        .replace(/(a-z0-9)(A-Z)/g, '$1-$2')
        // 步骤2：将所有非字母数字的字符（空格、下划线、等）替换为连字符
        .replace(/[^a-zA-Z0-9]/g, '-')
        // 步骤3：转为全小写
        .toLowerCase()
        // 步骤4：合并连续的连字符（如 hello--world → hello-world）
        .replace(/-+/g, '-')
        // 步骤5：移除首尾的连字符（如 -hello-world- → hello-world）
        .replace(/^-+|-+$/g, ''));
}


/***/ }),

/***/ "./src/string/maxCountChar.ts":
/*!************************************!*\
  !*** ./src/string/maxCountChar.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   maxCountChar: () => (/* binding */ maxCountChar)
/* harmony export */ });
/**
 * 统计字符串汇总出现最多的字符和次数
 * @param str
 * @returns
 */
function maxCountChar(str) {
    const result = {};
    for (const char of str) {
        result[char] = (result[char] || 0) + 1;
    }
    let maxChar = '';
    let maxCount = 0;
    for (const [char, count] of Object.entries(result)) {
        if (count > maxCount) {
            maxChar = char;
            maxCount = count;
        }
    }
    return { char: maxChar, count: maxCount };
}


/***/ }),

/***/ "./src/string/padEnd.ts":
/*!******************************!*\
  !*** ./src/string/padEnd.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   padEnd: () => (/* binding */ padEnd)
/* harmony export */ });
/**
 * padEnd：字符串结尾补全
 * @param str
 * @param strLength
 * @param padStr
 * @returns
 */
function padEnd(str, strLength, padStr = ' ') {
    const padLength = strLength - str.length;
    if (padLength <= 0) {
        return str;
    }
    return str + padStr.repeat(padLength);
}


/***/ }),

/***/ "./src/string/padStart.ts":
/*!********************************!*\
  !*** ./src/string/padStart.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   padStart: () => (/* binding */ padStart)
/* harmony export */ });
/**
 * padStart：字符串开头补全（封装原生，如 padStart('123', 5, '0') → '00123'）
 * @param str
 * @param strLength
 * @param padStr
 * @returns
 */
function padStart(str, strLength, padStr = ' ') {
    let padLength = strLength - str.length;
    if (padLength <= 0) {
        return str;
    }
    return padStr.repeat(padLength) + str;
}


/***/ }),

/***/ "./src/string/parseUrlParams.ts":
/*!**************************************!*\
  !*** ./src/string/parseUrlParams.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseUrlParams: () => (/* binding */ parseUrlParams)
/* harmony export */ });
/**
 * url解析，将字符串解析成对象
 * @example http://xxx.com?a=1&b=2 -> {a: '1', b: '2'}
 * @param url
 * @returns
 */
function parseUrlParams(url) {
    const paramsStr = url.split('?')[1];
    if (!paramsStr) {
        return {};
    }
    const params = {};
    paramsStr.split('&').forEach((param) => {
        const [key, value] = param.split('=');
        params[key] = value;
    });
    return params;
}


/***/ }),

/***/ "./src/string/plindrome.ts":
/*!*********************************!*\
  !*** ./src/string/plindrome.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   plindrome: () => (/* binding */ plindrome)
/* harmony export */ });
/* harmony import */ var _reverseStr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reverseStr */ "./src/string/reverseStr.ts");

/**
 * 判断字符串是否是回文
 * @example abcdcba
 * @param str
 * @returns
 */
function plindrome(str) {
    return str === (0,_reverseStr__WEBPACK_IMPORTED_MODULE_0__.reverseStr)(str);
}


/***/ }),

/***/ "./src/string/reverseStr.ts":
/*!**********************************!*\
  !*** ./src/string/reverseStr.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   reverseStr: () => (/* binding */ reverseStr)
/* harmony export */ });
/**
 * 反转字符串
 * @param str
 * @returns
 */
function reverseStr(str) {
    return str.split('').reverse().join('');
}


/***/ }),

/***/ "./src/string/snakeCase.ts":
/*!*********************************!*\
  !*** ./src/string/snakeCase.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   snakeCase: () => (/* binding */ snakeCase)
/* harmony export */ });
/**
 * 字符串转下划线
 * @example（如 snakeCase('helloWorld') → 'hello_world'）
 * @param str
 * @returns
 */
function snakeCase(str) {
    return str
        .replace(/(a-z0-9)(A-Z)/g, '$1_$2')
        .replace(/[^a-z0-9A-Z]/g, '_')
        .toLowerCase()
        .replace(/_+/g, '_')
        .replace(/^_+|_+$/g, '');
}


/***/ }),

/***/ "./src/string/startWith.ts":
/*!*********************************!*\
  !*** ./src/string/startWith.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startWith: () => (/* binding */ startWith)
/* harmony export */ });
/**
 * 判断字符串是否以指定值开头（封装原生，兼容低版本）
 * @param str
 * @param prefix
 * @returns
 */
function startWith(str, prefix) {
    const strPrefix = str.slice(0, prefix.length);
    return strPrefix === prefix;
}


/***/ }),

/***/ "./src/string/trim.ts":
/*!****************************!*\
  !*** ./src/string/trim.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   trim: () => (/* binding */ trim)
/* harmony export */ });
/**
 * trim：移除字符串首尾空格（封装原生，兼容低版本）
 * @param str
 * @returns
 */
function trim(str) {
    // 边界处理：非字符串类型，转为空字符串
    if (typeof str !== 'string') {
        return '';
    }
    // 优先使用原生 trim（现代浏览器/高版本 JS 环境）
    if (typeof String.prototype.trim === 'function') {
        return str.trim();
    }
    // 低版本环境兜底（正则实现，兼容 IE8-）
    // 正则说明：^[\s\uFEFF\xA0]+ 匹配开头的空格/全角空格/零宽空格；[\s\uFEFF\xA0]+$ 匹配结尾的
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}


/***/ }),

/***/ "./src/string/truncate.ts":
/*!********************************!*\
  !*** ./src/string/truncate.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   truncate: () => (/* binding */ truncate)
/* harmony export */ });
/**
 * 字符串截取，超出部分显示成...
 * @param str
 * @param limit
 * @returns
 */
function truncate(str, limit) {
    return str.length > limit ? str.slice(0, limit) + '...' : str;
}


/***/ }),

/***/ "./src/tools/delay.ts":
/*!****************************!*\
  !*** ./src/tools/delay.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   delay: () => (/* binding */ delay)
/* harmony export */ });
/**
 * 延迟执行函数（返回 Promise，如 delay(1000).then(()=>{})）
 * @param ms
 * @returns
 */
function delay(ms) {
    let timerId = null;
    const delayPromise = new Promise((resolve) => {
        timerId = setTimeout(() => {
            resolve();
            timerId = null;
        }, ms);
    });
    delayPromise.cancel = () => {
        if (timerId !== null) {
            clearTimeout(timerId);
            timerId = null;
        }
    };
    return delayPromise;
}


/***/ }),

/***/ "./src/tools/random.ts":
/*!*****************************!*\
  !*** ./src/tools/random.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   random: () => (/* binding */ random)
/* harmony export */ });
/**
 * 生成指定范围的随机数（如 random(1, 10) → 5）
 * @param min
 * @param max
 * @returns
 */
function random(min, max) {
    let temp = 0;
    if (min > max) {
        temp = min;
        min = max;
        max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


/***/ }),

/***/ "./src/tools/range.ts":
/*!****************************!*\
  !*** ./src/tools/range.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   range: () => (/* binding */ range)
/* harmony export */ });
/**
 * 生成数字范围数组（如 range(1, 5) → [1,2,3,4]，支持步长）
 * @param min
 * @param max
 * @param step
 * @returns
 */
function range(min, max, step = 1) {
    const reuslt = [];
    for (let i = min; i < max; i += step) {
        reuslt.push(i);
    }
    return reuslt;
}


/***/ }),

/***/ "./src/tools/uniqueId.ts":
/*!*******************************!*\
  !*** ./src/tools/uniqueId.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uniqueId: () => (/* binding */ uniqueId)
/* harmony export */ });
const idGenerator = (function* createId() {
    let id = 0;
    while (true) {
        yield id++;
    }
})();
function uniqueId(prefix) {
    const { value: id } = idGenerator.next();
    return `${prefix}_${id}`;
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LinkedList: () => (/* reexport safe */ _da_LinkedList__WEBPACK_IMPORTED_MODULE_71__.LinkedList),
/* harmony export */   MyPromise: () => (/* reexport safe */ _Promise__WEBPACK_IMPORTED_MODULE_72__.MyPromise),
/* harmony export */   Queue: () => (/* reexport safe */ _da_Queue__WEBPACK_IMPORTED_MODULE_69__.Queue),
/* harmony export */   Stack: () => (/* reexport safe */ _da_Stack__WEBPACK_IMPORTED_MODULE_70__.Stack),
/* harmony export */   ajax: () => (/* reexport safe */ _ajax__WEBPACK_IMPORTED_MODULE_68__.ajax),
/* harmony export */   apply: () => (/* reexport safe */ _function_apply__WEBPACK_IMPORTED_MODULE_24__.apply),
/* harmony export */   bind: () => (/* reexport safe */ _function_bind__WEBPACK_IMPORTED_MODULE_26__.bind),
/* harmony export */   call: () => (/* reexport safe */ _function_call__WEBPACK_IMPORTED_MODULE_25__.call),
/* harmony export */   camelCase: () => (/* reexport safe */ _string_camelCase__WEBPACK_IMPORTED_MODULE_43__.camelCase),
/* harmony export */   capitalize: () => (/* reexport safe */ _string_capitalize__WEBPACK_IMPORTED_MODULE_44__.capitalize),
/* harmony export */   capitalizeWords: () => (/* reexport safe */ _string_capitalizeWords__WEBPACK_IMPORTED_MODULE_45__.capitalizeWords),
/* harmony export */   chunk: () => (/* reexport safe */ _array_chunk__WEBPACK_IMPORTED_MODULE_9__.chunk),
/* harmony export */   clone: () => (/* reexport safe */ _object_clone__WEBPACK_IMPORTED_MODULE_32__.clone),
/* harmony export */   cloneDeep: () => (/* reexport safe */ _object_cloneDeep__WEBPACK_IMPORTED_MODULE_33__.cloneDeep),
/* harmony export */   compact: () => (/* reexport safe */ _array_compact__WEBPACK_IMPORTED_MODULE_10__.compact),
/* harmony export */   concat: () => (/* reexport safe */ _array_concat__WEBPACK_IMPORTED_MODULE_11__.concat),
/* harmony export */   countChars: () => (/* reexport safe */ _string_countChars__WEBPACK_IMPORTED_MODULE_46__.countChars),
/* harmony export */   createContext: () => (/* reexport safe */ _react_hooks_useContext__WEBPACK_IMPORTED_MODULE_66__.createContext),
/* harmony export */   curry: () => (/* reexport safe */ _function_curry__WEBPACK_IMPORTED_MODULE_27__.curry),
/* harmony export */   debounce: () => (/* reexport safe */ _function_debounce__WEBPACK_IMPORTED_MODULE_30__.debounce),
/* harmony export */   delay: () => (/* reexport safe */ _tools_delay__WEBPACK_IMPORTED_MODULE_60__.delay),
/* harmony export */   drop: () => (/* reexport safe */ _array_drop__WEBPACK_IMPORTED_MODULE_12__.drop),
/* harmony export */   dropRight: () => (/* reexport safe */ _array_drop__WEBPACK_IMPORTED_MODULE_12__.dropRight),
/* harmony export */   endWith: () => (/* reexport safe */ _string_endWith__WEBPACK_IMPORTED_MODULE_47__.endWith),
/* harmony export */   entries: () => (/* reexport safe */ _object_entries__WEBPACK_IMPORTED_MODULE_34__.entries),
/* harmony export */   filter: () => (/* reexport safe */ _array_filter__WEBPACK_IMPORTED_MODULE_13__.filter),
/* harmony export */   find: () => (/* reexport safe */ _array_find__WEBPACK_IMPORTED_MODULE_14__.find),
/* harmony export */   findIndex: () => (/* reexport safe */ _array_find__WEBPACK_IMPORTED_MODULE_14__.findIndex),
/* harmony export */   flatten: () => (/* reexport safe */ _array_flatten__WEBPACK_IMPORTED_MODULE_15__.flatten),
/* harmony export */   forEach: () => (/* reexport safe */ _array_forEach__WEBPACK_IMPORTED_MODULE_16__.forEach),
/* harmony export */   get: () => (/* reexport safe */ _object_get__WEBPACK_IMPORTED_MODULE_35__.get),
/* harmony export */   has: () => (/* reexport safe */ _object_has__WEBPACK_IMPORTED_MODULE_36__.has),
/* harmony export */   includes: () => (/* reexport safe */ _array_includes__WEBPACK_IMPORTED_MODULE_17__.includes),
/* harmony export */   indexOf: () => (/* reexport safe */ _array_indexOf__WEBPACK_IMPORTED_MODULE_18__.indexOf),
/* harmony export */   isAnagram: () => (/* reexport safe */ _string_isAnagram__WEBPACK_IMPORTED_MODULE_48__.isAnagram),
/* harmony export */   isArray: () => (/* reexport safe */ _base_isArray__WEBPACK_IMPORTED_MODULE_0__.isArray),
/* harmony export */   isBoolean: () => (/* reexport safe */ _base_isBoolean__WEBPACK_IMPORTED_MODULE_1__.isBoolean),
/* harmony export */   isEmpty: () => (/* reexport safe */ _base_isEmpty__WEBPACK_IMPORTED_MODULE_2__.isEmpty),
/* harmony export */   isFunction: () => (/* reexport safe */ _base_isFunction__WEBPACK_IMPORTED_MODULE_3__.isFunction),
/* harmony export */   isNull: () => (/* reexport safe */ _base_isNull__WEBPACK_IMPORTED_MODULE_4__.isNull),
/* harmony export */   isNumber: () => (/* reexport safe */ _base_isNumber__WEBPACK_IMPORTED_MODULE_5__.isNumber),
/* harmony export */   isObject: () => (/* reexport safe */ _base_isObject__WEBPACK_IMPORTED_MODULE_6__.isObject),
/* harmony export */   isString: () => (/* reexport safe */ _base_isString__WEBPACK_IMPORTED_MODULE_7__.isString),
/* harmony export */   isUndefined: () => (/* reexport safe */ _base_isUndefined__WEBPACK_IMPORTED_MODULE_8__.isUndefined),
/* harmony export */   kebabCase: () => (/* reexport safe */ _string_kebabCase__WEBPACK_IMPORTED_MODULE_49__.kebabCase),
/* harmony export */   keys: () => (/* reexport safe */ _object_keys__WEBPACK_IMPORTED_MODULE_37__.keys),
/* harmony export */   map: () => (/* reexport safe */ _array_map__WEBPACK_IMPORTED_MODULE_19__.map),
/* harmony export */   maxCountChar: () => (/* reexport safe */ _string_maxCountChar__WEBPACK_IMPORTED_MODULE_50__.maxCountChar),
/* harmony export */   memoize: () => (/* reexport safe */ _function_memoize__WEBPACK_IMPORTED_MODULE_28__.memoize),
/* harmony export */   merge: () => (/* reexport safe */ _array_merge__WEBPACK_IMPORTED_MODULE_20__.merge),
/* harmony export */   newInstance: () => (/* reexport safe */ _object_newInstance__WEBPACK_IMPORTED_MODULE_38__.newInstance),
/* harmony export */   omit: () => (/* reexport safe */ _object_omit__WEBPACK_IMPORTED_MODULE_39__.omit),
/* harmony export */   once: () => (/* reexport safe */ _function_once__WEBPACK_IMPORTED_MODULE_29__.once),
/* harmony export */   padEnd: () => (/* reexport safe */ _string_padEnd__WEBPACK_IMPORTED_MODULE_51__.padEnd),
/* harmony export */   padStart: () => (/* reexport safe */ _string_padStart__WEBPACK_IMPORTED_MODULE_52__.padStart),
/* harmony export */   parseUrlParams: () => (/* reexport safe */ _string_parseUrlParams__WEBPACK_IMPORTED_MODULE_53__.parseUrlParams),
/* harmony export */   pick: () => (/* reexport safe */ _object_pick__WEBPACK_IMPORTED_MODULE_40__.pick),
/* harmony export */   plindrome: () => (/* reexport safe */ _string_plindrome__WEBPACK_IMPORTED_MODULE_54__.plindrome),
/* harmony export */   pubsub: () => (/* reexport safe */ _PubSub__WEBPACK_IMPORTED_MODULE_73__.pubsub),
/* harmony export */   pull: () => (/* reexport safe */ _array_pull__WEBPACK_IMPORTED_MODULE_21__.pull),
/* harmony export */   random: () => (/* reexport safe */ _tools_random__WEBPACK_IMPORTED_MODULE_61__.random),
/* harmony export */   range: () => (/* reexport safe */ _tools_range__WEBPACK_IMPORTED_MODULE_62__.range),
/* harmony export */   reverseStr: () => (/* reexport safe */ _string_reverseStr__WEBPACK_IMPORTED_MODULE_55__.reverseStr),
/* harmony export */   set: () => (/* reexport safe */ _object_set__WEBPACK_IMPORTED_MODULE_41__.set),
/* harmony export */   slice: () => (/* reexport safe */ _array_slice__WEBPACK_IMPORTED_MODULE_22__.slice),
/* harmony export */   snakeCase: () => (/* reexport safe */ _string_snakeCase__WEBPACK_IMPORTED_MODULE_56__.snakeCase),
/* harmony export */   startWith: () => (/* reexport safe */ _string_startWith__WEBPACK_IMPORTED_MODULE_57__.startWith),
/* harmony export */   throttle: () => (/* reexport safe */ _function_throttle__WEBPACK_IMPORTED_MODULE_31__.throttle),
/* harmony export */   trim: () => (/* reexport safe */ _string_trim__WEBPACK_IMPORTED_MODULE_58__.trim),
/* harmony export */   truncate: () => (/* reexport safe */ _string_truncate__WEBPACK_IMPORTED_MODULE_59__.truncate),
/* harmony export */   unique: () => (/* reexport safe */ _array_unique__WEBPACK_IMPORTED_MODULE_23__.unique),
/* harmony export */   uniqueId: () => (/* reexport safe */ _tools_uniqueId__WEBPACK_IMPORTED_MODULE_63__.uniqueId),
/* harmony export */   useEffect: () => (/* reexport safe */ _react_hooks_useEffect__WEBPACK_IMPORTED_MODULE_65__.useEffect),
/* harmony export */   useRequest: () => (/* reexport safe */ _react_hooks_useRequest__WEBPACK_IMPORTED_MODULE_67__.useRequest),
/* harmony export */   useState: () => (/* reexport safe */ _react_hooks_useState__WEBPACK_IMPORTED_MODULE_64__.useState),
/* harmony export */   values: () => (/* reexport safe */ _object_values__WEBPACK_IMPORTED_MODULE_42__.values)
/* harmony export */ });
/* harmony import */ var _base_isArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base/isArray */ "./src/base/isArray.ts");
/* harmony import */ var _base_isBoolean__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base/isBoolean */ "./src/base/isBoolean.ts");
/* harmony import */ var _base_isEmpty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base/isEmpty */ "./src/base/isEmpty.ts");
/* harmony import */ var _base_isFunction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base/isFunction */ "./src/base/isFunction.ts");
/* harmony import */ var _base_isNull__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base/isNull */ "./src/base/isNull.ts");
/* harmony import */ var _base_isNumber__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./base/isNumber */ "./src/base/isNumber.ts");
/* harmony import */ var _base_isObject__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./base/isObject */ "./src/base/isObject.ts");
/* harmony import */ var _base_isString__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./base/isString */ "./src/base/isString.ts");
/* harmony import */ var _base_isUndefined__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./base/isUndefined */ "./src/base/isUndefined.ts");
/* harmony import */ var _array_chunk__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./array/chunk */ "./src/array/chunk.ts");
/* harmony import */ var _array_compact__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./array/compact */ "./src/array/compact.ts");
/* harmony import */ var _array_concat__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./array/concat */ "./src/array/concat.ts");
/* harmony import */ var _array_drop__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./array/drop */ "./src/array/drop.ts");
/* harmony import */ var _array_filter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./array/filter */ "./src/array/filter.ts");
/* harmony import */ var _array_find__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./array/find */ "./src/array/find.ts");
/* harmony import */ var _array_flatten__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./array/flatten */ "./src/array/flatten.ts");
/* harmony import */ var _array_forEach__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./array/forEach */ "./src/array/forEach.ts");
/* harmony import */ var _array_includes__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./array/includes */ "./src/array/includes.ts");
/* harmony import */ var _array_indexOf__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./array/indexOf */ "./src/array/indexOf.ts");
/* harmony import */ var _array_map__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./array/map */ "./src/array/map.ts");
/* harmony import */ var _array_merge__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./array/merge */ "./src/array/merge.ts");
/* harmony import */ var _array_pull__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./array/pull */ "./src/array/pull.ts");
/* harmony import */ var _array_slice__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./array/slice */ "./src/array/slice.ts");
/* harmony import */ var _array_unique__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./array/unique */ "./src/array/unique.ts");
/* harmony import */ var _function_apply__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./function/apply */ "./src/function/apply.ts");
/* harmony import */ var _function_call__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./function/call */ "./src/function/call.ts");
/* harmony import */ var _function_bind__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./function/bind */ "./src/function/bind.ts");
/* harmony import */ var _function_curry__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./function/curry */ "./src/function/curry.ts");
/* harmony import */ var _function_memoize__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./function/memoize */ "./src/function/memoize.ts");
/* harmony import */ var _function_once__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./function/once */ "./src/function/once.ts");
/* harmony import */ var _function_debounce__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./function/debounce */ "./src/function/debounce.ts");
/* harmony import */ var _function_throttle__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./function/throttle */ "./src/function/throttle.ts");
/* harmony import */ var _object_clone__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./object/clone */ "./src/object/clone.ts");
/* harmony import */ var _object_cloneDeep__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./object/cloneDeep */ "./src/object/cloneDeep.ts");
/* harmony import */ var _object_entries__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./object/entries */ "./src/object/entries.ts");
/* harmony import */ var _object_get__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./object/get */ "./src/object/get.ts");
/* harmony import */ var _object_has__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./object/has */ "./src/object/has.ts");
/* harmony import */ var _object_keys__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./object/keys */ "./src/object/keys.ts");
/* harmony import */ var _object_newInstance__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./object/newInstance */ "./src/object/newInstance.ts");
/* harmony import */ var _object_omit__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./object/omit */ "./src/object/omit.ts");
/* harmony import */ var _object_pick__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./object/pick */ "./src/object/pick.ts");
/* harmony import */ var _object_set__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./object/set */ "./src/object/set.ts");
/* harmony import */ var _object_values__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./object/values */ "./src/object/values.ts");
/* harmony import */ var _string_camelCase__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./string/camelCase */ "./src/string/camelCase.ts");
/* harmony import */ var _string_capitalize__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./string/capitalize */ "./src/string/capitalize.ts");
/* harmony import */ var _string_capitalizeWords__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./string/capitalizeWords */ "./src/string/capitalizeWords.ts");
/* harmony import */ var _string_countChars__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./string/countChars */ "./src/string/countChars.ts");
/* harmony import */ var _string_endWith__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./string/endWith */ "./src/string/endWith.ts");
/* harmony import */ var _string_isAnagram__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./string/isAnagram */ "./src/string/isAnagram.ts");
/* harmony import */ var _string_kebabCase__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./string/kebabCase */ "./src/string/kebabCase.ts");
/* harmony import */ var _string_maxCountChar__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./string/maxCountChar */ "./src/string/maxCountChar.ts");
/* harmony import */ var _string_padEnd__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./string/padEnd */ "./src/string/padEnd.ts");
/* harmony import */ var _string_padStart__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./string/padStart */ "./src/string/padStart.ts");
/* harmony import */ var _string_parseUrlParams__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./string/parseUrlParams */ "./src/string/parseUrlParams.ts");
/* harmony import */ var _string_plindrome__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./string/plindrome */ "./src/string/plindrome.ts");
/* harmony import */ var _string_reverseStr__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./string/reverseStr */ "./src/string/reverseStr.ts");
/* harmony import */ var _string_snakeCase__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./string/snakeCase */ "./src/string/snakeCase.ts");
/* harmony import */ var _string_startWith__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./string/startWith */ "./src/string/startWith.ts");
/* harmony import */ var _string_trim__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./string/trim */ "./src/string/trim.ts");
/* harmony import */ var _string_truncate__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./string/truncate */ "./src/string/truncate.ts");
/* harmony import */ var _tools_delay__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./tools/delay */ "./src/tools/delay.ts");
/* harmony import */ var _tools_random__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./tools/random */ "./src/tools/random.ts");
/* harmony import */ var _tools_range__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./tools/range */ "./src/tools/range.ts");
/* harmony import */ var _tools_uniqueId__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./tools/uniqueId */ "./src/tools/uniqueId.ts");
/* harmony import */ var _react_hooks_useState__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./react-hooks/useState */ "./src/react-hooks/useState.ts");
/* harmony import */ var _react_hooks_useEffect__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./react-hooks/useEffect */ "./src/react-hooks/useEffect.ts");
/* harmony import */ var _react_hooks_useContext__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./react-hooks/useContext */ "./src/react-hooks/useContext.tsx");
/* harmony import */ var _react_hooks_useRequest__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./react-hooks/useRequest */ "./src/react-hooks/useRequest.ts");
/* harmony import */ var _ajax__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./ajax */ "./src/ajax/index.ts");
/* harmony import */ var _da_Queue__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./da/Queue */ "./src/da/Queue.ts");
/* harmony import */ var _da_Stack__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./da/Stack */ "./src/da/Stack.ts");
/* harmony import */ var _da_LinkedList__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./da/LinkedList */ "./src/da/LinkedList.ts");
/* harmony import */ var _Promise__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Promise */ "./src/Promise/index.ts");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub/index.ts");
/* Base */









/* Array */















/* Function */








/* Object */











/* String */

















/* Tools */




/* React Hooks */




/* Ajax */

/* lazyload */
/* 页面倒计时 */
/* 数据结构 & 算法 */



/* Promise */

/* 发布订阅 */

/* Base */

/* Array */

/* Function */

/* Object */

/* String */

/* Tools */

/* React Hooks */

/* lazyload */
/* 页面倒计时 */
/* 数据结构 & 算法 */

/* Promise */

/* Ajax */



})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map