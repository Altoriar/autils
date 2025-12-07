interface AjaxConfig {
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	url: string;
	params?: Record<string, any>;
	data?: Document | XMLHttpRequestBodyInit | null | undefined;
}

export function ajax(config: AjaxConfig, cb: Function) {
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
	} else if (method === 'POST') {
		xhr.open(method, url);
		xhr.send(config.data);
	}

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {
			cb(xhr.responseText);
		}
	};
}
