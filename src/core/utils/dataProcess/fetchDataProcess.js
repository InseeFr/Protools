/* eslint-disable no-unused-vars */
import { fetcherGet } from 'core/fetchData/fetch';

import Moment from 'moment';

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

export const getBPMNByProcessName = (selected) => {
	const urlEndpoint = 'getBPMNFile/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + selected;
	const file = fetcherGet(apiUrl)
		.then((r) => {
			//console.log('Get BPMN File : ', r.data);
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
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + processInstanceId;
	const dataUrl = [];
	const listName = [];
	fetcherGet(apiUrl)
		.then((r) => {
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
	return [dataUrl, listName];
};

// Retrieve processDefinition ID from Process Instance ID
export const getProcessDefinitionID = async (id) => {
	const urlEndpoint = 'processDefinition/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + id;
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
export const getBPMNInfo = (id, listName) => {
	const urlEndpoint = 'bpmnInfo/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + id;
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

export const getCurrentActivityName = (id) => {
	// Fetch currents activities
	const urlEndpoint = 'executionActivities/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + id;
	const response = fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	return response;
};

export const getVariables = (processInstanceID) => {
	const urlEndpoint = 'variables/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + processInstanceID;
	const dataUrl = [];
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

export const getManualTasks = (processInstanceID) => {
	const urlEndpoint = 'tasksProcessID/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + processInstanceID;
	const dataUrl = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;

			for (const element of datatmp) {
				dataUrl.push({
					id: element.TaskId,
					name: element.name,
					createTime: Moment(element.createTime).format('DD/MM/YYYY - HH:mm'),
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

export const getAllTasksProcess = (id) => {
	//TODO : Refactor cette fonction pour ne faire qu'une requête pour les deux usages
	const urlEndpoint = 'processDefinition/';
	//const config = getConfigFile();
	const apiUrl = window.env.REACT_APP_API_URL + urlEndpoint + id;

	const response = fetcherGet(apiUrl)
		.then((r) => {
			const urlEndpoint2 = 'bpmnInfo/';
			const apiUrl2 = window.env.REACT_APP_API_URL + urlEndpoint2 + r.data;
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
