import axios from 'axios';

const basePath = `${window.location.origin}`;
export const getConfigFile = async () => {
	const client = axios.create({
		baseURL: basePath,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
	});
	try {
		const resp = await client.get('/configuration.json');
		return resp.data;
	} catch (err) {
		return console.log('Could not get configuration file', err);
	}
};
