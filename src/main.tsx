import React from 'react';
import ReactDOM from 'react-dom/client';
import { startReactDsfr } from '@codegouvfr/react-dsfr/spa';
import { RouteProvider } from './lib/routes/router';
import App from './App';

startReactDsfr({ defaultColorScheme: 'system' });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouteProvider>
      <App />
    </RouteProvider>
  </React.StrictMode>
);
