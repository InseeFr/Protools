import axios from 'axios';

const headers = {
	'Content-Type': 'application/json;charset=UTF-8',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': '*',
};

// Send a GET request to the API defined in the env variable
export const fetcherGet = (url) => {
	return axios.get(url, {
		mode: 'cors',
		headers: headers,
	});
};

// Send a GET request to the API defined in the env variable
export const fetcherPost = (url, Jsonbody = {}) => {
	return axios.post(url, Jsonbody, {
		mode: 'cors',
		headers: headers,
	});
};
