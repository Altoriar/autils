import { useState, useEffect } from 'react';

interface RequestConfig extends Request {
	method: 'get' | 'post' | 'put' | 'delete';
	url: string;
	params: Record<string, any>;
	data: Record<string, any>;
}

export function useRequest(config: RequestConfig) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [data, setData] = useState();

	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(config);
			setData(res as unknown as any);
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
