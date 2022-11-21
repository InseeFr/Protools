import { enquetesDico } from './mockDataVisuTypes';

export const getProcessDataVisuTypes = (selected) => {
	return Object.fromEntries(
		Object.entries(enquetesDico).filter(([key]) => key.includes(selected))
	);
};
