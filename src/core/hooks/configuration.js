import { useState, useEffect } from 'react';

const useConfiguration = () => {
	const [configuration, setConfiguration] = useState();

	useEffect(() => {
		if (!configuration) {
			fetch(`${window.location.origin}/configuration.json`)
				.then((r) => r.json())
				.then((r) => setConfiguration(r));
		}
	}, [configuration]);

	return [configuration];
};

export default useConfiguration;
