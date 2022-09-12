import { fetcherPost } from 'core/fetchData/fetchData';

export const claimTask = (user, taskID) => {
	const urlEndpoint = 'get-tasks/';
	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + user + '/' + taskID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Claim task Response :', r);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const executeTask = (user, taskID, variables) => {
	const urlEndpoint = 'complete-task/';

	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + user + '/' + taskID;

	fetcherPost(apiUrl, variables).then((r) => {
		console.log('Task executed! :', r);
	});
};

// Temporary solution to execute task, depend on forms type
export const temporaryExecuteTask = (taskID, variables) => {
	const urlEndpoint = 'get-tasks/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + 'user/' + taskID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Claim task Response :', r);
			console.log('variables: ', variables);
			const urlEndpointExe = 'complete-task/';
			const apiUrlExe =
				process.env.REACT_APP_API_URL + urlEndpointExe + 'user/' + taskID;
			console.log('apiUrlExe: ', apiUrlExe);
			fetcherPost(apiUrlExe, variables).then((r) => {
				console.log('Task executed! :', r);
			});
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const startProcess = (processKey, businessKey, variables) => {
	const urlEndpoint = 'start-process/';
	const apiUrl =
		process.env.REACT_APP_API_URL +
		urlEndpoint +
		processKey +
		'/' +
		businessKey;
	const dataUrl = [];
	fetcherPost(apiUrl, variables)
		.then((r) => {
			console.log('Process started : ', r.data);
			dataUrl.push(r.data);
		})
		.catch((error) => {
			console.log('error', error);
		});
	return dataUrl;
};

export const deleteProcess = (processID) => {
	const urlEndpoint = 'deleteProcess/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Delete Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const suspendProcess = (processID) => {
	const urlEndpoint = 'suspendProcess/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Suspending Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const relaunchProcess = (processID) => {
	const urlEndpoint = 'restart/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Restart Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};
