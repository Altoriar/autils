import { useState, useEffect } from 'react';

interface RequestConfig extends Request {
	method: 'get' | 'post' | 'put' | 'delete';
	url: string;
	params: Record<string, any>;
	data: Record<string, any>;
}

export function useRequest<T extends unknown = undefined>(
	config: RequestConfig,
): {
	loading: boolean;
	error: string;
	data: T | undefined;
	refresh: () => Promise<void>;
} {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState<T>();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(config);
			const data = await res.json();
			setData(data);
		} catch (e) {
			setError(e as string);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { loading, error, data, refresh: fetchData };
}
