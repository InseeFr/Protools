const getConfig = async () => {
	const configuration = fetch(`configuration.json`).then((r) => r.json());
	console.log('FetchConfiguration :', configuration);
	return configuration;
};

export default getConfig;