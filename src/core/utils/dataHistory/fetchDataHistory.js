import { fetcherGet } from 'core/fetchData/fetch';
import { setAutoFreeze } from 'immer';

function padTo2Digits(num) {
	return num.toString().padStart(2, '0');
}
function msToHMS(ms) {
	let seconds = Math.floor(ms / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	return `${padTo2Digits(hours)}h${padTo2Digits(minutes)}:${padTo2Digits(
		seconds
	)}`;
}

export const fetchTaskDataHistory = () => {
	setAutoFreeze(false);
	const urlEndpoint = 'history/activity/';
	//const config = getConfigFile();
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint;
	const dataUrlTask = [];
	const dataUrlActivities = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const taskFilter = ['userTask', 'serviceTask', 'subProcess'];
			const activitiesFilter = [
				'startEvent',
				'exclusiveGateway',
				'endEvent',
				'intermediateCatchEvent',
				'parallelGateway',
			];
			const datatmpsActivites = r.data.filter((item) => {
				return activitiesFilter.includes(item.activityType);
			});
			const datatmp = r.data.filter((item) => {
				return taskFilter.includes(item.activityType);
			});
			console.log('datatmpsActivites', datatmpsActivites);
			for (let i = 0; i < datatmp.length; i++) {
				const obj = {
					id: datatmp[i].id,
					name: datatmp[i].activityName,
					type: datatmp[i].activityType,
					processID: datatmp[i].processDefinitionId,
					deleted: datatmp[i].deleted,
					duration:
						datatmp[i].durationInMillis !== null
							? msToHMS(datatmp[i].durationInMillis)
							: msToHMS(0),
					endDate: datatmp[i].endTime !== null ? datatmp[i].endTime : 'null',
				};

				dataUrlTask.push(obj);
			}
			for (let i = 0; i < datatmpsActivites.length; i++) {
				const obj = {
					id: datatmpsActivites[i].id,
					name: datatmpsActivites[i].activityName,
					type: datatmpsActivites[i].activityType,
					processID: datatmpsActivites[i].processDefinitionId,
					deleted: datatmpsActivites[i].deleted,
					duration:
						datatmpsActivites[i].durationInMillis !== null
							? msToHMS(datatmpsActivites[i].durationInMillis)
							: msToHMS(0),
					endDate:
						datatmpsActivites[i].endTime !== null
							? datatmpsActivites[i].endTime
							: 'null',
				};

				dataUrlActivities.push(obj);
			}
			//console.log('dataUrlPastTask: ', dataUrlTask);
			console.log('dataUrlPastActivities: ', dataUrlActivities);
		})
		.catch((e) => {
			console.log(e);
		});

	return [dataUrlTask, dataUrlActivities];
};

export const fetchProcessDataHistory = () => {
	setAutoFreeze(false);
	const urlEndpoint = 'history/process/';
	//const config = getConfigFile();
	const apiUrl = process.env.REACT_APP_API_URL + urlEndpoint;
	const dataUrl = [];
	fetcherGet(apiUrl)
		.then((r) => {
			const datatmp = r.data;
			for (let i = 0; i < 30; i++) {
				const obj = {
					id: datatmp[i].processInstanceId,
					name: datatmp[i].processDefinitionKey,
					type: datatmp[i].activityType,
					businessKey: datatmp[i].businessKey,
					deleted: datatmp[i].deleted,
					revision: datatmp[i].revision,
					duration:
						datatmp[i].durationInMillis !== null
							? msToHMS(datatmp[i].durationInMillis)
							: msToHMS(0),
				};

				dataUrl.push(obj);
			}
			console.log('dataUrlPastProcess: ', dataUrl);
		})
		.catch((e) => {
			console.log(e);
		});

	return [dataUrl];
};
