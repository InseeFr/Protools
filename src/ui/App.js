import RoutesWeb from 'ui/routes/routes';
import Preloader from 'ui/components/shared/preloader/component';
import { useState } from 'react';

const App = () => {
	const [, /*apiUrl*/ setApiUrl] = useState();
	const [configuration, setConfiguration] = useState(false);

	if (!configuration) {
		fetch(`configuration.json`)
			.then((r) => r.json())
			.then((r) => {
				console.log('Configuration.json Loaded: ', r);
				const { API_URL } = r;
				setApiUrl(API_URL);
				setConfiguration(true);
			});
	}
	return <>{configuration ? <RoutesWeb /> : <Preloader />}</>;
};

export default App;
