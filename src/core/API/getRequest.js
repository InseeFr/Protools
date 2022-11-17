import { fetcher } from 'core/fetchData/fetch';
import { getEnvVar } from 'core/fetchData/env';
//TODO DELETE
// Send a GET request to the API defined in the env variable
// Not used yet
export const getRequest = (endpoint) => {
	const apiUrl = getEnvVar('API_URL');
	const url = apiUrl + endpoint;
	return fetcher(url, 'GET', null);
};
