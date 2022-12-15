import axios from 'axios';
import { fetchConfig } from 'core/config';
//TODO DELETE do not use axios but fetch unstead
const headers = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': '*',
};

const instance = axios.create({
	baseURL: await fetchConfig().then((config) => {
		console.log('config.API_URL', config.API_URL);
		return config.API_URL;
	}),
});
// Send a GET request to the API defined in the env variable
export const fetcherGet = (url) => {
	return instance.get(url, {
		mode: 'cors',
		headers: headers,
	});
};

// Send a GET request to the API defined in the env variable
export const fetcherPost = (url, Jsonbody = {}) => {
	return instance.post(url, Jsonbody, {
		mode: 'cors',
		headers: headers,
	});
};
