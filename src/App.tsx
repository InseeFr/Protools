import { createContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { fr } from '@codegouvfr/react-dsfr';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { getConfig } from './lib/hooks/getConfig';
import Router from './lib/routes/router';
import ErrorBoundary from './components/shared/layout/ErrorBoundary';
import { AuthProvider } from './lib/utils/provider/authProvider';

import './App.css';

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
  const [configuration, setConfiguration] = useState(false);
  const [config, setConfig] = useState<ConfigContextType>({
    apiUrl: '',
    keycloakAuth: 'anonymous',
    identityProvider: '',
  });

  if (!configuration) {
    useEffect(() => {
      getConfig().then((data: any) => {
        console.log('Fetched config');
        setConfig({
          apiUrl: data.API_URL,
          keycloakAuth: data.KEYCLOAK_AUTH_TYPE,
          identityProvider: data.IDENTITY_PROVIDER,
        });
      });
    }, []);
  }

  return (
    <MuiDsfrThemeProvider>
      <ConfigContext.Provider value={config}>
        <AuthProvider
          authType={config.keycloakAuth}
          identityProvider={config.identityProvider}
        >
          <QueryClientProvider client={queryClient} contextSharing>
            <ReactQueryDevtools initialIsOpen={false} />
            <Header
              //brandTop={<>RÉPUBLIQUE FRANÇAISE</>}
              homeLinkProps={{
                href: '/',
                title: 'Protools - Accueil',
              }}
              operatorLogo={{
                alt: 'Logo Insee',
                imgUrl: '/insee.png',
                orientation: 'vertical',
              }}
              quickAccessItems={[
                {
                  iconId: 'fr-icon-admin-line',
                  linkProps: {
                    href: '/',
                  },
                  text: 'FakeUser',
                },
              ]}
              serviceTagline="Orchestration des protocoles d'enquêtes"
              serviceTitle="Protools"
              brandTop={undefined}
            />
            <ErrorBoundary>
              <div
                style={{
                  // margin: 'auto',
                  // maxWidth: 1000,
                  ...fr.spacing('padding', { topBottom: '10v' }),
                }}
              >
                <RouterProvider router={Router} />
              </div>
            </ErrorBoundary>
          </QueryClientProvider>
        </AuthProvider>
      </ConfigContext.Provider>
    </MuiDsfrThemeProvider>
  );
}

export default App;
