import { getRequest } from 'core/fetch';

/*
 * This function deals with API fetching only, it's getRequest or Post/PutRequest
 * If you have a Back for front you don't need to make some logic or business
 * if not you can add an abstration and put in this client the function which give or put data with data processing 
 */
export const createApiClient = (apiUrl) => {
	return {
		getTasks: async () => getRequest(`${apiUrl}/tasks`),
		getTask: async (id) => getRequest(`${apiUrl}/task/${id}`),
	};
};
