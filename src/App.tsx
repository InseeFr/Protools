import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { fr } from '@codegouvfr/react-dsfr';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import Router from './lib/routes/router';

import ErrorBoundary from './components/shared/layout/ErrorBoundary';

import './App.css';
import getConfig from './lib/hooks/getConfig';

const queryClient = new QueryClient();
function App() {
  const [configuration, setConfiguration] = useState(false);

  if (!configuration) {
    getConfig().then(() => {
      console.log('Fetched config');

      setConfiguration(true);
    });
  }

  return (
    <MuiDsfrThemeProvider>
      <QueryClientProvider client={queryClient} contextSharing>
        <ReactQueryDevtools initialIsOpen={false} />
        <Header
          brandTop={<>RÉPUBLIQUE FRANÇAISE</>}
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
              iconId: 'fr-icon-add-circle-line',
              linkProps: {
                href: '/launch',
              },
              text: 'Lancer',
            },
            {
              iconId: 'fr-icon-todo-line',
              linkProps: {
                href: '/visualize',
              },
              text: 'Visualiser',
            },
          ]}
          serviceTagline="Orchestration des protocoles d'enquêtes"
          serviceTitle="Protools"
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
