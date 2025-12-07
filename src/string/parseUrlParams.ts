/**
 * url解析，将字符串解析成对象
 * @example http://xxx.com?a=1&b=2 -> {a: '1', b: '2'}
 * @param url
 * @returns
 */
export function parseUrlParams(url: string): Record<string, string> {
	const paramsStr = url.split('?')[1];

	if (!paramsStr) {
		return {};
	}

	const params: Record<string, string> = {};

	paramsStr.split('&').forEach((param) => {
		const [key, value] = param.split('=');
		params[key] = value;
	});

	return params;
}
