import { fetcherPost } from 'core/fetchData/fetch';
import axios from 'axios';

export const claimTask = (API_URL, user, taskID) => {
	const urlEndpoint = 'get-tasks/';

	const apiUrl = API_URL + urlEndpoint + user + '/' + taskID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Claim task Response :', r);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const executeTask = (API_URL, user, taskID, variables) => {
	const urlEndpoint = 'complete-task/';

	const apiUrl = API_URL + urlEndpoint + user + '/' + taskID;

	fetcherPost(apiUrl, variables).then((r) => {
		console.log('Task executed! :', r);
	});
};

// Temporary solution to execute task, depend on forms type
export const temporaryExecuteTask = (API_URL, taskID, variables) => {
	const urlEndpoint = 'complete-task/';
	const apiUrl = API_URL + urlEndpoint + 'user/' + taskID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Claim task & Execute Response :', r);
			console.log('variables: ', variables);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const startProcess = (API_URL, processKey, businessKey, variables) => {
	const urlEndpoint = 'start-process/';
	const apiUrl = API_URL + urlEndpoint + processKey + '/' + businessKey;
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

export const deleteProcess = (API_URL, processID) => {
	const urlEndpoint = 'deleteProcess/';
	const apiUrl = API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Delete Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const suspendProcess = (API_URL, processID) => {
	const urlEndpoint = 'suspendProcess/';
	const apiUrl = API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Suspending Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const relaunchProcess = (API_URL, processID) => {
	const urlEndpoint = 'restart/';
	const apiUrl = API_URL + urlEndpoint + processID;
	return fetcherPost(apiUrl)
		.then((r) => {
			console.log('Restart Process Instance :', processID);
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const uploadFileToProcess = (API_URL, file, taskID) => {
	const urlEndpoint = 'upload-context/';
	const apiUrl = API_URL + urlEndpoint;
	console.log('Upload file endpoint : ', apiUrl);
	const formData = new FormData();
	formData.append('file', file);
	formData.append('taskID', taskID);
	const configHeader = {
		headers: {
			'content-type': 'multipart/form-data',
		},
	};
	axios.post(apiUrl, formData, configHeader).then((response) => {
		console.log('File upload response code : ', response.status);
	});
};
