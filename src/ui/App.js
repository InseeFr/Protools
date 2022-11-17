import RoutesWeb from 'ui/routes/routes';
import Preloader from 'ui/components/shared/preloader/component';
import { useState } from 'react';
//import { CoreProvider } from './coreApi';
//import { createApiClient, createMockApiClient } from 'core/apiClient';

const App = () => {
	const [, /*apiUrl*/ setApiUrl] = useState();
	const [configuration, setConfiguration] = useState(false);

	if (!configuration) {
		fetch(`${window.location.origin}/configuration.json`)
			.then((r) => r.json())
			.then((r) => {
				const { API_URL } = r;
				setApiUrl(API_URL);
				setConfiguration(true);
			});
	}
	return (
		<>
			{configuration ? (
				// <CoreProvider
				// 	value={apiUrl ? createApiClient(apiUrl) : createMockApiClient()}
				// >
				// 	<RoutesWeb />
				// </CoreProvider>
				<RoutesWeb />
			) : (
				<Preloader />
			)}
		</>
	);
};

export default App;
