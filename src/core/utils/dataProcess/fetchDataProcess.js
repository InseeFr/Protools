/* eslint-disable no-unused-vars */
import { fetcherGet } from 'core/fetchData/fetch';
import { fetchConfig } from 'core/config';

export const getUrlBPMNByProcessName = (selected) => {
	switch (selected) {
		case 'EnqueteWeb':
			return 'https://raw.githubusercontent.com/InseeFr/Protools-Back-Office/main/src/main/resources/processes/TestPQVWoMessages.bpmn20.xml';
		case 'EnqueteWebContinue':
			return 'https://raw.githubusercontent.com/InseeFr/Protools-Back-Office/develop/src/main/resources/processes/Processus_famille.bpmn20.xml';
		case 'ProcessTestFeature':
			return 'https://raw.githubusercontent.com/InseeFr/Protools-Back-Office/develop/src/main/resources/processes/ProcessTestFeatures.bpmn20.xml';
		default:
			console.log('Error: BPMN file not found');
			return 'https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/modeler/resources/newDiagram.bpmn';
	}
};

export const getBPMNByProcessName = (API_URL, selected) => {
	const urlEndpoint = 'getBPMNFile/';
	const apiUrl = API_URL + urlEndpoint + selected;
	const file = fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	console.log('Get BPMN File :', file);
	return file;
};

export const getAvailableTasks = (processInstanceId) => {
	const urlEndpoint = 'tasksProcessID/';

	const dataUrl = [];
	const listName = [];
	fetchConfig().then((config) => {
		const API_URL = config.API_URL;
		const apiUrl = API_URL + urlEndpoint + processInstanceId;
		fetcherGet(apiUrl)
			.then((r) => {
				console.log('Available tasks : ', r.data);
				const datatmp = r.data;
				for (const element of datatmp) {
					dataUrl.push({
						id: element.TaskId,
						name: element.name,
						description: element.description,
						processInstance: element.processInstance,
						createTime: element.createTime,
						processDefinitionID: element.processDefinitionID,
					});
					listName.push(element.name);
				}
			})
			.catch((e) => {
				console.log('error', e);
			});
	});

	return [dataUrl, listName];
};

// Retrieve processDefinition ID from Process Instance ID
export const getProcessDefinitionID = async (API_URL, id) => {
	const urlEndpoint = 'processDefinition/';
	const apiUrl = API_URL + urlEndpoint + id;
	fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
};

// Retrieve the id of a task from task name
export const getCorrespondingBpmnElement = (BpmnResponse, liste) => {
	const obj = Object.entries(BpmnResponse).reduce(
		(acc, [key, val]) =>
			liste.filter((name) => name === val.name).length > 0
				? { ...acc, key }
				: { ...acc },

		{}
	);
	console.log('obj: ', obj);
	return obj;
};

// Retrieve all BPMN elements from a processDefinitionID
export const getBPMNInfo = (API_URL, id, listName) => {
	const urlEndpoint = 'bpmnInfo/';
	const apiUrl = API_URL + urlEndpoint + id;
	let response = {};
	fetcherGet(apiUrl)
		.then((r) => {
			response = getCorrespondingBpmnElement(r.data, listName);
			return response;
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const getCurrentActivityName = (API_URL, id) => {
	// Fetch currents activities
	const urlEndpoint = 'executionActivities/';

	const apiUrl = API_URL + urlEndpoint + id;
	const response = fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	return response;
};

export const getVariables = (API_URL, processInstanceID) => {
	const urlEndpoint = 'variables/';
	const dataUrl = [];

	const apiUrl = API_URL + urlEndpoint + processInstanceID;

	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (const variable in datatmp) {
				dataUrl.push({
					id: processInstanceID + ':' + variable,
					name: variable,
					type: typeof datatmp[variable],
					value: datatmp[variable],
				});
			}
		})

		.catch((e) => {
			console.log('error', e);
		});

	return dataUrl;
};

export const getManualTasks = (API_URL, processInstanceID) => {
	const urlEndpoint = 'tasksProcessID/';

	const apiUrl = API_URL + urlEndpoint + processInstanceID;
	const dataUrl = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;

			for (const element of datatmp) {
				dataUrl.push({
					id: element.TaskId,
					name: element.name,
					createTime: element.createTime,
					category: element.category,
					link: getManualTaskCategoryLink(element.category),
				});
			}
		})
		.catch((e) => {
			console.log('error', e);
		});
	console.log('Manual Tasks : ', dataUrl);
	return dataUrl;
};

export const getAllTasksProcess = (API_URL, id) => {
	//TODO : Refactor cette fonction pour ne faire qu'une requête pour les deux usages
	const urlEndpoint = 'processDefinition/';
	const apiUrl = API_URL + urlEndpoint + id;

	const response = fetcherGet(apiUrl)
		.then((r) => {
			const urlEndpoint2 = 'bpmnInfo/';
			const apiUrl2 = API_URL + urlEndpoint2 + r.data;
			const HELPME = fetcherGet(apiUrl2).then((r) => {
				const dataUrl = [];
				const datatmp = r.data;
				for (const [idTaskBox, content] of Object.entries(datatmp)) {
					dataUrl.push({
						name: content.name,
						id: content.id,
						description: content.documentation,
						implementationType: content.implementationType,
						asynchronous: content.asynchronous,
					});
				}
				const response = dataUrl.filter((obj) => obj.name !== null);

				return response;
			});
			return HELPME.then((r) => {
				return r;
			});
		})
		.catch((e) => {
			console.log('error', e);
		});
	return response;
};

const getManualTaskCategoryLink = (category) => {
	switch (category) {
		case 'Upload':
			return '/upload-context';
		case 'Review':
			return '/review-task';
		default:
			return '/review-task';
	}
};
