import { useEffect, useState } from 'react';
import { getConfigFile } from 'core/config/configuration';

export const useConfig = (property) => {
	const [_property, setProperty] = useState('');
	useEffect(() => {
		getConfigFile()
			.then((resp) => setProperty(resp[property]))
			.catch((err) => err);
	}, [property]);
	return _property;
};
