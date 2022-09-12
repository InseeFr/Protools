import { fetcher } from 'core/fetchData/fetchData';
import { getEnvVar } from 'core/fetchData/env';

// Send a GET request to the API defined in the env variable
// Not used yet
export const getRequest = (endpoint) => {
	const apiUrl = getEnvVar('API_URL');
	const url = apiUrl + endpoint;
	return fetcher(url, 'GET', null);
};
