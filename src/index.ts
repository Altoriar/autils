/* Base */
import { isArray } from './base/isArray';
import { isBoolean } from './base/isBoolean';
import { isEmpty } from './base/isEmpty';
import { isFunction } from './base/isFunction';
import { isNull } from './base/isNull';
import { isNumber } from './base/isNumber';
import { isObject } from './base/isObject';
import { isString } from './base/isString';
import { isUndefined } from './base/isUndefined';

/* Array */
import { chunk } from './array/chunk';
import { compact } from './array/compact';
import { concat } from './array/concat';
import { drop, dropRight } from './array/drop';
import { filter } from './array/filter';
import { find, findIndex } from './array/find';
import { flatten } from './array/flatten';
import { forEach } from './array/forEach';
import { includes } from './array/includes';
import { indexOf } from './array/indexOf';
import { map } from './array/map';
import { merge } from './array/merge';
import { pull } from './array/pull';
import { slice } from './array/slice';
import { unique } from './array/unique';

/* Function */
import { apply } from './function/apply';
import { call } from './function/call';
import { bind } from './function/bind';
import { curry } from './function/curry';
import { memoize } from './function/memoize';
import { once } from './function/once';
import { debounce } from './function/debounce';
import { throttle } from './function/throttle';

/* Object */
import { clone } from './object/clone';
import { cloneDeep } from './object/cloneDeep';
import { entries } from './object/entries';
import { get } from './object/get';
import { has } from './object/has';
import { keys } from './object/keys';
import { newInstance } from './object/newInstance';
import { omit } from './object/omit';
import { pick } from './object/pick';
import { set } from './object/set';
import { values } from './object/values';

/* String */
import { camelCase } from './string/camelCase';
import { endWith } from './string/endWith';
import { kebabCase } from './string/kebabCase';
import { padEnd } from './string/padEnd';
import { padStart } from './string/padStart';
import { snakeCase } from './string/snakeCase';
import { startWith } from './string/startWith';
import {
	reverseStr,
	palindrome,
	truncate,
	capitalize,
	capitalizeWords,
	countChars,
	maxCountChars,
	kebabToCamel,
	camelToKebab,
	parseUrlParams,
} from './string';

/* Tools */
import { delay } from './tools/delay';
import { random } from './tools/random';
import { range } from './tools/range';
import { uniqueId } from './tools/uniqueId';

/* React Hooks */
import { useState } from './react-hooks/useState';
import { useEffect } from './react-hooks/useEffect';
import { createContext } from './react-hooks/useContext';
import { useRequest } from './react-hooks/useRequest';

/* Ajax */
import { ajax } from './ajax';

/* lazyload */

/* 页面倒计时 */

/* 数据结构 & 算法 */

/* Promise */
import { MyPromise } from './Promise';

/* 发布订阅 */
import { pubsub } from './PubSub';

/* Base */
export {
	isArray,
	isBoolean,
	isEmpty,
	isFunction,
	isNull,
	isNumber,
	isObject,
	isString,
	isUndefined,
};

/* Array */
export {
	chunk,
	compact,
	concat,
	drop,
	dropRight,
	filter,
	find,
	findIndex,
	flatten,
	forEach,
	includes,
	indexOf,
	map,
	merge,
	pull,
	slice,
	unique,
};

/* Function */
export { apply, call, bind, curry, memoize, once, debounce, throttle };

/* Object */
export {
	clone,
	cloneDeep,
	entries,
	get,
	has,
	keys,
	newInstance,
	omit,
	pick,
	set,
	values,
};

/* String */
export {
	camelCase,
	endWith,
	kebabCase,
	padEnd,
	padStart,
	snakeCase,
	startWith,
	// ------
	reverseStr,
	palindrome,
	truncate,
	capitalize,
	capitalizeWords,
	countChars,
	maxCountChars,
	kebabToCamel,
	camelToKebab,
	parseUrlParams,
};

/* Tools */
export { delay, random, range, uniqueId };

/* React Hooks */
export { useState, useEffect, createContext, useRequest };

/* lazyload */

/* 页面倒计时 */

/* 数据结构 & 算法 */

/* Promise */
export { MyPromise };

/* Ajax */
export { ajax };

export { pubsub };
