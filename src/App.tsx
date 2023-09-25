import { createContext, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { getConfig } from './lib/hooks/getConfig';
import Router from './lib/routes/router';
import { AuthProvider } from './lib/utils/provider/authProvider';
import { CircularProgress, Typography } from '@mui/material';

import './App.css';
import Layout from './components/shared/layout/Layout';

interface ConfigContextType {
  apiUrl: string;
  keycloakAuth: string;
  identityProvider: string;
}

export const ConfigContext = createContext<ConfigContextType>({
  apiUrl: '',
  keycloakAuth: '',
  identityProvider: '',
});
const queryClient = new QueryClient();

function App() {
  const [isConfigLoaded, setIsConfigLoaded] = useState<boolean>(true);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: '',
    keycloakAuth: 'none',
    identityProvider: '',
  });

  if (!isConfigLoaded) {
    useEffect(() => {
      getConfig().then((data: any) => {
        console.log('Fetched config');
        setConfig({
          apiUrl: data.API_URL,
          keycloakAuth: data.KEYCLOAK_AUTH_TYPE,
          identityProvider: data.IDENTITY_PROVIDER,
        });
        setIsConfigLoaded(true);
      });
    }, []);
  }

  const context = useMemo(() => config, [config]);
  return (
    <>
      {!isConfigLoaded && (
        <ConfigContext.Provider value={context}>
          <AuthProvider
            authType={config.keycloakAuth}
            identityProvider={config.identityProvider}
          >
            <MuiDsfrThemeProvider>
              <QueryClientProvider client={queryClient} contextSharing>
                <ReactQueryDevtools initialIsOpen={false} />
                <Layout>
                  <RouterProvider router={Router} />
                </Layout>
              </QueryClientProvider>
            </MuiDsfrThemeProvider>
          </AuthProvider>
        </ConfigContext.Provider>
      )}
      {isConfigLoaded && (
        <>
          <Layout>
            <CircularProgress />
            <Typography variant="h2">Chargement en cours</Typography>
          </Layout>
        </>
      )}
    </>
  );
}

export default App;
