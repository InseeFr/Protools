/* eslint-disable no-unused-vars */
import { fetcherGet } from 'core/fetchData/fetchData';
import Moment from 'moment';
export const getUrlBPMNByProcessName = (selected) => {
	switch (selected) {
		case 'EnqueteTest':
			return 'https://raw.githubusercontent.com/POCProtools/Protools-Flowable/protools-demo/src/main/resources/processes/casUsageTest.bpmn20.xml';
		case 'EnqueteWeb2':
			return 'https://raw.githubusercontent.com/POCProtools/Protools-Flowable/protools-demo/src/main/resources/processes/TestPQVWithMessages.bpmn20.xml';
		case 'EnqueteWeb':
			return 'https://raw.githubusercontent.com/POCProtools/Protools-Flowable/protools-demo/src/main/resources/processes/TestPQVWoMessages.bpmn20.xml';
		case 'EnqueteWebContinue':
			return 'https://raw.githubusercontent.com/POCProtools/Protools-Flowable/protools-demo/src/main/resources/processes/EnqueteFamille.bpmn20.xml';
		default:
			console.log('Error: BPMN file not found');
			return 'https://raw.githubusercontent.com/bpmn-io/bpmn-js-examples/master/modeler/resources/newDiagram.bpmn';
	}
};

// Retrieve all available task of the current process
export const getAvailableTasks = (processInstanceId) => {
	const urlEndpoint = 'tasksProcessID/';
	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + processInstanceId;
	const dataUrl = [];
	const listName = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (let i = 0; i < datatmp.length; i++) {
				dataUrl.push({
					id: datatmp[i].TaskId,
					name: datatmp[i].name,
					description: datatmp[i].description,
					processInstance: datatmp[i].processInstance,
					createTime: datatmp[i].createTime,
					processDefinitionID: datatmp[i].processDefinitionID,
				});
				listName.push(datatmp[i].name);
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
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;
	fetcherGet(apiUrl)
		.then((r) => {
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	//console.log('ProcessDefinitionId', result);
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
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;
	let response = {};
	fetcherGet(apiUrl)
		.then((r) => {
			response = getCorrespondingBpmnElement(r.data, listName);
			//console.log('getBPMNInfo: ', response);
			return response;
		})
		.catch((e) => {
			console.log('error', e);
		});
};

export const getCurrentActivityName = (id) => {
	// Fetch currents activities
	const urlEndpoint = 'executionActivities/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;

	const RAAAAAAAH = fetcherGet(apiUrl)
		.then((r) => {
			//console.log('Current activities : ', r.data);
			return r.data;
		})
		.catch((e) => {
			console.log('error', e);
		});
	return RAAAAAAAH;
};

export const getVariables = (processInstanceID) => {
	const urlEndpoint = 'variables/';
	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + processInstanceID;
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
	const apiUrl =
		process.env.REACT_APP_API_URL + urlEndpoint + processInstanceID;
	const dataUrl = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;

			for (let i = 0; i < datatmp.length; i++) {
				dataUrl.push({
					id: datatmp[i].TaskId,
					name: datatmp[i].name,
					createTime: Moment(datatmp[i].createTime).format(
						'DD/MM/YYYY - HH:mm'
					),
				});
			}
		})
		.catch((e) => {
			console.log('error', e);
		});
	return dataUrl;
};

export const getAllTasksProcess = (id) => {
	//TODO : Refactor cette fonction pour ne faire qu'une requête pour les deux usages
	const urlEndpoint = 'processDefinition/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint + id;

	const ILFAITCHO = fetcherGet(apiUrl)
		.then((r) => {
			const urlEndpoint2 = 'bpmnInfo/';
			const apiUrl2 = process.env.REACT_APP_API_URL + urlEndpoint2 + r.data;
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
	return ILFAITCHO;
};
