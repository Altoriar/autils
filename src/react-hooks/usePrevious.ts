import { useEffect, useRef } from 'react';


/**
 * 获取上一次的值，由于setState更新是异步的，所以获取到的是上一次渲染的值，进行比对操作
 * @param value 
 * @returns 
 */
export const usePrevious = <T = unknown>(value: T): T | undefined => {
	const ref = useRef<T | undefined>(undefined);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};
