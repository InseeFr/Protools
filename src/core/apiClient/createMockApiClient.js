//TODO create a mock directory into core with mock data

const tasks = {
	id1: { label: 'task1' },
	id2: { label: 'task2' },
};
export const createMockApiClient = () => {
	return {
		getTasks: () => Promise.resolve(tasks),
		getTask: (id) => Promise.resolve(tasks[id] ?? tasks.id1),
	};
};
