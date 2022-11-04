/* eslint-disable no-unused-vars */
import { fetcherGet } from 'core/fetchData/fetchData';
import theme from 'theme';
import Moment from 'moment';

const getProcessState = (datatmp, i) => {
	if (datatmp[i].isSuspended) {
		return 'suspended';
	}
	if (datatmp[i].deadLetterList > 0) {
		return 'deadLetter';
	} else {
		return 'ok';
	}
};
// Retrive all process currently running
export const fetchProcessData = () => {
	const urlEndpoint = 'processInstances/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint;
	const dataUrl = [];
	let pieProcessdata = {
		labels: ['Enquête Famille', 'Qualité Poulet', 'Test'],
		datasets: [
			{
				label: 'processus',
				data: [0, 0, 0, 0],
				backgroundColor: ['#FEC89A', '#B56576', '#98C1D9', '#84A98C'],
				borderColor: [theme.palette.background.default],
				borderWidth: 2,
			},
		],
	};

	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data.processes;

			for (let i = 0; i < datatmp.length; i++) {
				dataUrl.push({
					id: datatmp[i].id,
					tag: datatmp[i].businessKey,
					state: getProcessState(datatmp, i),
					processKey: datatmp[i].processKey,
					documentation: datatmp[i].documentation,
					date: Moment(datatmp[i].startTime).format('DD/MM/YYYY - HH:mm'),

					action: {
						url: datatmp[i].processKey + '/' + datatmp[i].id,
						doc: datatmp[i].documentation,
						date: Moment(datatmp[i].startTime).format('DD/MM/YYYY - HH:mm'),
						key: datatmp[i].businessKey,
						state: !datatmp[i].isSuspended && datatmp[i].deadLetterList === 0,
					},
				});
				const indexColor = getPieProcessColorIndex(datatmp[i].businessKey);
				pieProcessdata.datasets[0].data[indexColor] =
					pieProcessdata.datasets[0].data[indexColor] + 1;
			}
		})
		.catch((e) => {
			console.log(e);
		});
	return [dataUrl, pieProcessdata];
};

// Retrieve all available tasks
export const fetchTaskData = () => {
	const urlEndpoint = 'tasks/';
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint;
	const dataUrl = [];
	let pieTaskdata = {
		labels: [
			'Upload de fichier',
			'Review informations',
			'Action sur enquête',
			'Autre',
		],
		datasets: [
			{
				label: 'processus',
				data: [0, 0, 0],
				backgroundColor: ['#555b6e', '#ffd6ba', '#89b0ae', '#81A4CD'],
				borderColor: [theme.palette.background.default],
				borderWidth: 2,
			},
		],
	};
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (const element of datatmp) {
				dataUrl.push({
					id: element.TaskId,
					name: element.name,
					category: element.category,
					description: element.description,
					processInstance: element.processInstance,
					createTime: Moment(element.createTime).format('DD/MM/YYYY - HH:mm'),
					action: '',
				});
				const indexColor = getPieTaskCategoryIndex(element.category);
				pieTaskdata.datasets[0].data[indexColor] =
					pieTaskdata.datasets[0].data[indexColor] + 1;
			}
		})
		.catch((e) => {
			console.log(e);
		});
	return [dataUrl, pieTaskdata];
};

const getPieProcessColorIndex = (BusinessKey) => {
	switch (BusinessKey) {
		case 'Famille':
			return 0;
		case 'PQV':
			return 1;
		case 'Test':
			return 2;

		default:
			return 4;
	}
};

const getPieTaskCategoryIndex = (taskCategory) => {
	switch (taskCategory) {
		case 'Upload':
			return 0;
		case 'Review':
			return 1;
		case 'SurveyAction':
			return 2;
		default:
			return 2;
	}
};

export const fetchIncidentsData = () => {
	const urlEndpoint = 'history/suspended'; // ATM only suspended process
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint;
	const dataUrl = [];

	const urlEndpointDead = 'history/deadLetter'; // Deadletter jobs process
	const apiUrlDead = process.env.REACT_APP_API_URL + urlEndpointDead;

	let pieIncidentdata = {
		labels: ['Suspendu', 'Échecs', 'Externes'],
		datasets: [
			{
				label: 'processus',
				data: [0, 0, 3],
				backgroundColor: ['#FEDC86', '#F25C54', '#F48A66', '#84A98C'],
				borderColor: [theme.palette.background.default],
				borderWidth: 2,
			},
		],
	};
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (const element of datatmp) {
				dataUrl.push({
					typeIncident: 'Suspended',
					id: element.elementId,
					name: element.elementName,
					type: element.jobType,
					processID: element.processDefinitionId,
					retries: element.retries,
				});
				pieIncidentdata.datasets[0].data[0] += 1;
			}
			//console.log('dataUrlSuspended', dataUrl);
		})
		.catch((e) => {
			console.log(e);
		});

	fetcherGet(apiUrlDead)
		.then((r) => {
			const datatmp = r.data;
			for (const element of datatmp) {
				dataUrl.push({
					typeIncident: 'Deadletter',
					id: element.correlationId,
					name: element.elementName,
					type: element.jobType,
					processID: element.processDefinitionId,
					retries: element.retries,
				});
				pieIncidentdata.datasets[0].data[1] += 1;
			}
		})
		.catch((e) => {
			console.log(e);
		});

	return [dataUrl, pieIncidentdata];
};
