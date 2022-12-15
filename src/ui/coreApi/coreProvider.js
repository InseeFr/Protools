import React from 'react';
import { getEnvVar } from 'core/env';
import { createApiClient, createMockApiClient } from 'core/apiClient';

export const CoreApiContext = React.createContext();

export function CoreProvider({ children }) {
	const apiUrl = getEnvVar('API_URL');
	const apiClient = apiUrl ? createApiClient(apiUrl) : createMockApiClient();

	return (
		<CoreApiContext.Provider value={apiClient}>
			{children}
		</CoreApiContext.Provider>
	);
}

/**
 * To make a call in ui component, just
 */
