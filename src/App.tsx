import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MuiDsfrThemeProvider from '@codegouvfr/react-dsfr/mui';
import { Header } from '@codegouvfr/react-dsfr/Header';
import { fr } from '@codegouvfr/react-dsfr';
import { Box, Typography } from '@mui/material';
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
        <Header
          brandTop={<>INTITULE OFFICIEL</>}
          homeLinkProps={{
            href: '/',
            title: 'Protools - Accueil',
          }}
          serviceTagline="Orchestration des protocoles d'enquêtes"
          serviceTitle="Protools (header temporaire), j'aime pas trop l'ui personnellement"
        />
        <ErrorBoundary>
          <div
            style={{
              margin: 'auto',
              maxWidth: 1000,
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
