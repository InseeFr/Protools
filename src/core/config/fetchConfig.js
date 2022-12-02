export const fetchConfig = async () => {
	const configuration = fetch(`configuration.json`).then((r) => r.json());
	console.log('Configuration :', configuration);
	return configuration;
};
