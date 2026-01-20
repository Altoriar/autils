import { useEffect, useRef, useState } from 'react';

/**
 * 值节流
 * @param value 
 * @param delay 
 * @returns 
 * @example 
    const throttledKeyword = useThrottle(keyword, 500);
    useEffect(() => {
      fetchList(throttledKeyword);
    }, [throttledKeyword]);
 */
export const useThrottle = <T>(value: T, delay: number): T => {
	const [throttledValue, setThrottledValue] = useState<T>(value);
	const lastTimeRef = useRef(0);

	useEffect(() => {
		const now = Date.now();
    
		if (now - lastTimeRef.current >= delay) {
			setThrottledValue(value);
			lastTimeRef.current = now;
		} else {
			const timer = setTimeout(
				() => {
					setThrottledValue(value);
					lastTimeRef.current = Date.now();
				},
				delay - (now - lastTimeRef.current),
			);

			return () => clearTimeout(timer);
		}
	}, [value, delay]);

	return throttledValue;
};
