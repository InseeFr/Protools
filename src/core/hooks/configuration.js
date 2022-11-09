import { useState, useEffect } from 'react';

export const useConfiguration = () => {
	const [configuration, setConfiguration] = useState(null);

	useEffect(() => {
		if (!configuration) {
			const loadConfiguration = async () => {
				const response = await fetch(
					`${window.location.origin}/configuration.json`
				);
				const configurationResponse = await response.json();
				setConfiguration(configurationResponse);
				console.log('Loaded configuration ', configurationResponse);
			};
			loadConfiguration();
		}
	}, [configuration]);

	return { configuration };
};
