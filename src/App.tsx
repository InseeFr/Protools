import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { fr } from '@codegouvfr/react-dsfr';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { getConfig } from './lib/hooks/getConfig';
import Router from './lib/routes/router';
import ErrorBoundary from './components/shared/layout/ErrorBoundary';

import './App.css';

const queryClient = new QueryClient();
function App() {
  const [configuration, setConfiguration] = useState(false);
  const [apiUrl, setApiUrl] = useState<string>('');
  const [keycloakAuth, setKeycloakAuth] = useState<boolean>(false);

  if (!configuration) {
    getConfig().then((data: any) => {
      console.log('Fetched config');
      setConfiguration(true);
      setApiUrl(data.API_URL);
      setKeycloakAuth(data.KEYCLOAK_AUTH_URL == 'oidc');
    });
  }

  return (
    <MuiDsfrThemeProvider>
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
    </MuiDsfrThemeProvider>
  );
}

export default App;
