const fetcher = (url, method, body) => {
	const headers = {
		'Content-Type': 'application/json;charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': '*',
	};
	return fetch(url, {
		headers: headers,
		method,
		body: body ? JSON.stringify(body) : null,
	})
		.then((r) => {
			if (r.ok) return r.json();
			throw new Error('API failed');
		})
		.catch((e) => {
			throw new Error(`Fetch error for ${url} with the following error: ${e}`);
		});
};

// Send a GET request to the API defined in the env variable
export const getRequest = (url) => fetcher(url, 'GET', null);

// Send a POST request to the API defined in the env variable
export const postRequest = (url) => (body) => fetcher(url, 'POST', body);
