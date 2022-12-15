import { fetcherGet } from 'core/fetchData/fetch';

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
	const urlEndpoint = 'history/activity/';
	const dataUrlTask = [];
	const dataUrlActivities = [];
	fetcherGet(urlEndpoint)
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

			for (const element of datatmp) {
				const obj = {
					id: element.id,
					name: element.activityName,
					type: element.activityType,
					processID: element.processDefinitionId,
					deleted: element.deleted,
					duration:
						element.durationInMillis !== null
							? msToHMS(element.durationInMillis)
							: msToHMS(0),
					endDate: element.endTime !== null ? element.endTime : 'null',
				};
				dataUrlTask.push(obj);
			}
			for (const element of datatmpsActivites) {
				const obj = {
					id: element.id,
					name: element.activityName,
					type: element.activityType,
					processID: element.processDefinitionId,
					deleted: element.deleted,
					duration:
						element.durationInMillis !== null
							? msToHMS(element.durationInMillis)
							: msToHMS(0),
					endDate: element.endTime !== null ? element.endTime : 'null',
				};

				dataUrlActivities.push(obj);
			}
			console.log('dataUrlPastTask: ', dataUrlTask);
			console.log('dataUrlPastActivities: ', dataUrlActivities);
		})
		.catch((e) => {
			console.log(e);
		});

	return [dataUrlTask, dataUrlActivities];
};

export const fetchProcessDataHistory = () => {
	const urlEndpoint = 'history/process/';
	const dataUrl = [];
	fetcherGet(urlEndpoint)
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
