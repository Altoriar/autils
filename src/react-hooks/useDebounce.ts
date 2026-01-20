import { useEffect, useState } from 'react';

/**
 * 值防抖
 * @param value 
 * @param delay 毫秒 
 * @returns 
 * @example
    const debouncedKeyword = useDebounce(keyword, 500);
    useEffect(() => {
      fetchList(debouncedKeyword);
    }, [debouncedKeyword]);
 */
export const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		() => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return debouncedValue;
};
